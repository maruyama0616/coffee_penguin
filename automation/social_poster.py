"""
SNS投稿モジュール（Instagram/X/Threads）
"""

import os
import time
from pathlib import Path
from typing import Dict, Any, List, Optional
import logging

from config import (
    INSTAGRAM_USERNAME,
    INSTAGRAM_PASSWORD,
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
    THREADS_ACCESS_TOKEN,
    POSTING_SETTINGS,
    RETRY_SETTINGS
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SocialMediaPoster:
    """SNS投稿を管理するクラス"""
    
    def __init__(self):
        """初期化"""
        self.results = {
            "instagram": {"success": False, "error": None, "url": None},
            "twitter": {"success": False, "error": None, "url": None},
            "threads": {"success": False, "error": None, "url": None}
        }
    
    def post_to_all_platforms(
        self,
        image_path: Path,
        caption: str,
        hashtags: List[str]
    ) -> Dict[str, Any]:
        """
        すべてのプラットフォームに投稿
        
        Args:
            image_path: 画像ファイルパス
            caption: キャプション
            hashtags: ハッシュタグリスト
        
        Returns:
            投稿結果の辞書
        """
        # Instagram投稿
        if POSTING_SETTINGS["instagram"]["enabled"]:
            self._post_to_instagram(image_path, caption, hashtags)
        
        # X (Twitter)投稿
        if POSTING_SETTINGS["twitter"]["enabled"]:
            self._post_to_twitter(image_path, caption, hashtags)
        
        # Threads投稿
        if POSTING_SETTINGS["threads"]["enabled"]:
            self._post_to_threads(image_path, caption, hashtags)
        
        return self.results
    
    def _post_to_instagram(
        self,
        image_path: Path,
        caption: str,
        hashtags: List[str]
    ) -> None:
        """
        Instagramに投稿
        
        Args:
            image_path: 画像ファイルパス
            caption: キャプション
            hashtags: ハッシュタグリスト
        """
        try:
            from instagrapi import Client
            
            # キャプションとハッシュタグを結合
            full_caption = f"{caption}\n\n{' '.join(hashtags)}"
            
            # 文字数制限チェック
            max_length = POSTING_SETTINGS["instagram"]["caption_max_length"]
            if len(full_caption) > max_length:
                full_caption = full_caption[:max_length-3] + "..."
            
            # Instagramクライアント初期化
            cl = Client()
            
            # セッションファイルの確認
            session_file = Path(__file__).parent / "instagram_session.json"
            
            if session_file.exists():
                # 既存セッションを読み込み
                cl.load_settings(session_file)
                logger.info("既存のInstagramセッションを使用")
            else:
                # 新規ログイン
                cl.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)
                # セッションを保存
                cl.dump_settings(session_file)
                logger.info("Instagramに新規ログイン")
            
            # 画像を投稿
            media = cl.photo_upload(
                str(image_path),
                caption=full_caption
            )
            
            post_url = f"https://www.instagram.com/p/{media.code}/"
            
            self.results["instagram"] = {
                "success": True,
                "error": None,
                "url": post_url
            }
            
            logger.info(f"Instagram投稿成功: {post_url}")
            
        except Exception as e:
            error_msg = str(e)
            self.results["instagram"] = {
                "success": False,
                "error": error_msg,
                "url": None
            }
            logger.error(f"Instagram投稿失敗: {error_msg}")
    
    def _post_to_twitter(
        self,
        image_path: Path,
        caption: str,
        hashtags: List[str]
    ) -> None:
        """
        X (Twitter)に投稿
        
        Args:
            image_path: 画像ファイルパス
            caption: キャプション
            hashtags: ハッシュタグリスト
        """
        try:
            import tweepy
            
            # キャプションとハッシュタグを結合
            full_caption = f"{caption}\n\n{' '.join(hashtags)}"
            
            # 文字数制限チェック
            max_length = POSTING_SETTINGS["twitter"]["caption_max_length"]
            if len(full_caption) > max_length:
                # ハッシュタグを減らして調整
                full_caption = f"{caption}\n\n{hashtags[0]}"
                if len(full_caption) > max_length:
                    full_caption = full_caption[:max_length-3] + "..."
            
            # Twitter API v2クライアント初期化
            client = tweepy.Client(
                consumer_key=TWITTER_API_KEY,
                consumer_secret=TWITTER_API_SECRET,
                access_token=TWITTER_ACCESS_TOKEN,
                access_token_secret=TWITTER_ACCESS_SECRET
            )
            
            # API v1.1も必要（メディアアップロード用）
            auth = tweepy.OAuth1UserHandler(
                TWITTER_API_KEY,
                TWITTER_API_SECRET,
                TWITTER_ACCESS_TOKEN,
                TWITTER_ACCESS_SECRET
            )
            api = tweepy.API(auth)
            
            # 画像をアップロード
            media = api.media_upload(str(image_path))
            
            # ツイート投稿
            response = client.create_tweet(
                text=full_caption,
                media_ids=[media.media_id]
            )
            
            tweet_id = response.data["id"]
            post_url = f"https://twitter.com/{INSTAGRAM_USERNAME}/status/{tweet_id}"
            
            self.results["twitter"] = {
                "success": True,
                "error": None,
                "url": post_url
            }
            
            logger.info(f"X投稿成功: {post_url}")
            
        except Exception as e:
            error_msg = str(e)
            self.results["twitter"] = {
                "success": False,
                "error": error_msg,
                "url": None
            }
            logger.error(f"X投稿失敗: {error_msg}")
    
    def _post_to_threads(
        self,
        image_path: Path,
        caption: str,
        hashtags: List[str]
    ) -> None:
        """
        Threadsに投稿
        
        Args:
            image_path: 画像ファイルパス
            caption: キャプション
            hashtags: ハッシュタグリスト
        """
        try:
            import requests
            
            # キャプションとハッシュタグを結合
            full_caption = f"{caption}\n\n{' '.join(hashtags)}"
            
            # 文字数制限チェック
            max_length = POSTING_SETTINGS["threads"]["caption_max_length"]
            if len(full_caption) > max_length:
                full_caption = full_caption[:max_length-3] + "..."
            
            # Threads API (Meta Graph API)
            # Note: 実際のThreads APIの実装は公式ドキュメントに従って調整が必要
            
            # 1. 画像をアップロード
            upload_url = "https://graph.threads.net/v1.0/me/media"
            upload_params = {
                "image_url": self._upload_image_to_public_url(image_path),
                "media_type": "IMAGE",
                "text": full_caption,
                "access_token": THREADS_ACCESS_TOKEN
            }
            
            upload_response = requests.post(upload_url, params=upload_params)
            upload_response.raise_for_status()
            creation_id = upload_response.json()["id"]
            
            # 2. 投稿を公開
            publish_url = "https://graph.threads.net/v1.0/me/media_publish"
            publish_params = {
                "creation_id": creation_id,
                "access_token": THREADS_ACCESS_TOKEN
            }
            
            publish_response = requests.post(publish_url, params=publish_params)
            publish_response.raise_for_status()
            media_id = publish_response.json()["id"]
            
            post_url = f"https://www.threads.net/@{INSTAGRAM_USERNAME}/post/{media_id}"
            
            self.results["threads"] = {
                "success": True,
                "error": None,
                "url": post_url
            }
            
            logger.info(f"Threads投稿成功: {post_url}")
            
        except Exception as e:
            error_msg = str(e)
            self.results["threads"] = {
                "success": False,
                "error": error_msg,
                "url": None
            }
            logger.error(f"Threads投稿失敗: {error_msg}")
    
    def _upload_image_to_public_url(self, image_path: Path) -> str:
        """
        画像を公開URLにアップロード（Threads API用）
        
        Args:
            image_path: 画像ファイルパス
        
        Returns:
            公開URL
        """
        # Note: 実際には画像をS3などにアップロードして公開URLを取得する
        # ここではプレースホルダー
        # 実装例: manus-upload-file コマンドを使用
        import subprocess
        
        result = subprocess.run(
            ["manus-upload-file", str(image_path)],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return result.stdout.strip()
        else:
            raise Exception(f"画像アップロード失敗: {result.stderr}")


def main():
    """テスト実行"""
    # テスト用の画像とキャプション
    test_image = Path("/tmp/test_mocha.png")
    test_caption = "こんにちは、モカだよ☕️\n\n今日も一日、コーヒーと共に頑張ろう！"
    test_hashtags = ["#モカ", "#CoffeePenguin", "#コーヒータイム", "#癒し", "#かわいい"]
    
    # 投稿実行
    poster = SocialMediaPoster()
    results = poster.post_to_all_platforms(test_image, test_caption, test_hashtags)
    
    print("=== 投稿結果 ===")
    for platform, result in results.items():
        status = "✅ 成功" if result["success"] else "❌ 失敗"
        print(f"{platform}: {status}")
        if result["url"]:
            print(f"  URL: {result['url']}")
        if result["error"]:
            print(f"  エラー: {result['error']}")


if __name__ == "__main__":
    main()
