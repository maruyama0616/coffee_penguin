"""
モカSNS自動投稿システム - メインスクリプト
"""

import sys
import json
import logging
from pathlib import Path
from datetime import datetime
import traceback

from config import ARCHIVE_DIR, TIMEZONE
from date_theme import DateThemeDetector
from image_generator import ImageGenerator
from caption_generator import CaptionGenerator
from social_poster import SocialMediaPoster
from discord_notifier import DiscordNotifier

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def main():
    """メイン処理"""
    logger.info("=== モカSNS自動投稿システム開始 ===")
    
    try:
        # 1. 日付とテーマを取得
        logger.info("Step 1: 日付とテーマを取得")
        detector = DateThemeDetector()
        today = datetime.now()
        theme_data = detector.get_theme_for_date(today)
        
        logger.info(f"テーマ: {theme_data['event_name']}")
        logger.info(f"説明: {theme_data['theme']}")
        
        # 2. アーカイブディレクトリを作成
        date_str = today.strftime("%Y-%m-%d")
        archive_path = ARCHIVE_DIR / date_str
        archive_path.mkdir(parents=True, exist_ok=True)
        logger.info(f"アーカイブディレクトリ: {archive_path}")
        
        # 3. 画像を生成
        logger.info("Step 2: 画像を生成")
        image_generator = ImageGenerator()
        image_path = archive_path / "mocha_post.png"
        
        generated_image = image_generator.generate_image(theme_data, image_path)
        
        if not generated_image:
            raise Exception("画像生成に失敗しました")
        
        logger.info(f"画像生成成功: {generated_image}")
        
        # 4. キャプションとハッシュタグを生成
        logger.info("Step 3: キャプションとハッシュタグを生成")
        caption_generator = CaptionGenerator()
        caption, hashtags = caption_generator.generate_caption_and_hashtags(
            theme_data,
            platform="instagram"
        )
        
        logger.info(f"キャプション: {caption[:50]}...")
        logger.info(f"ハッシュタグ: {' '.join(hashtags)}")
        
        # キャプションを保存
        caption_file = archive_path / "caption.txt"
        with open(caption_file, 'w', encoding='utf-8') as f:
            f.write(caption)
            f.write("\n\n")
            f.write(" ".join(hashtags))
        
        # 5. SNSに投稿
        logger.info("Step 4: SNSに投稿")
        poster = SocialMediaPoster()
        posting_results = poster.post_to_all_platforms(
            image_path,
            caption,
            hashtags
        )
        
        # 投稿結果をログ出力
        for platform, result in posting_results.items():
            if result["success"]:
                logger.info(f"{platform}: 投稿成功 - {result['url']}")
            else:
                logger.error(f"{platform}: 投稿失敗 - {result['error']}")
        
        # 6. メタデータを保存
        metadata = {
            "date": date_str,
            "theme": theme_data,
            "caption": caption,
            "hashtags": hashtags,
            "posting_results": posting_results,
            "timestamp": datetime.now().isoformat()
        }
        
        metadata_file = archive_path / "metadata.json"
        with open(metadata_file, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        
        logger.info(f"メタデータ保存: {metadata_file}")
        
        # 7. Discord通知
        logger.info("Step 5: Discord通知")
        notifier = DiscordNotifier()
        notifier.send_success_notification(
            theme_data,
            caption,
            hashtags,
            posting_results,
            image_path
        )
        
        # 8. 成功判定
        success_count = sum(1 for r in posting_results.values() if r["success"])
        total_count = len(posting_results)
        
        logger.info(f"=== 投稿完了: {success_count}/{total_count} 成功 ===")
        
        # 少なくとも1つのプラットフォームで成功していればOK
        if success_count > 0:
            logger.info("✅ システム実行成功")
            return 0
        else:
            logger.error("❌ すべてのプラットフォームで投稿失敗")
            return 1
        
    except Exception as e:
        logger.error(f"❌ システム実行中にエラーが発生: {e}")
        logger.error(traceback.format_exc())
        
        # エラー通知
        try:
            notifier = DiscordNotifier()
            notifier.send_failure_notification(
                theme_data if 'theme_data' in locals() else {
                    "date": datetime.now().strftime("%Y-%m-%d"),
                    "event_name": "不明",
                    "theme": "エラーが発生しました"
                },
                str(e),
                posting_results if 'posting_results' in locals() else None
            )
        except:
            logger.error("Discord通知の送信にも失敗しました")
        
        return 1


if __name__ == "__main__":
    sys.exit(main())
