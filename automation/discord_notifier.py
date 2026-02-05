"""
Discord通知モジュール
"""

import requests
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime
import logging

from config import DISCORD_WEBHOOK_URL

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DiscordNotifier:
    """Discord Webhookを使用した通知クラス"""
    
    def __init__(self, webhook_url: str = DISCORD_WEBHOOK_URL):
        """
        初期化
        
        Args:
            webhook_url: Discord Webhook URL
        """
        self.webhook_url = webhook_url
    
    def send_success_notification(
        self,
        theme_data: Dict[str, Any],
        caption: str,
        hashtags: list,
        posting_results: Dict[str, Any],
        image_path: Optional[Path] = None
    ) -> bool:
        """
        投稿成功通知を送信
        
        Args:
            theme_data: テーマ情報
            caption: キャプション
            hashtags: ハッシュタグリスト
            posting_results: 投稿結果
            image_path: 画像パス（オプション）
        
        Returns:
            送信成功の真偽値
        """
        # 埋め込みメッセージを構築
        embed = {
            "title": "✅ モカの投稿が完了しました！",
            "description": f"**{theme_data['event_name']}**\n{theme_data['theme']}",
            "color": 0x8B4513,  # ブラウン色
            "fields": [
                {
                    "name": "📅 日付",
                    "value": theme_data['date'],
                    "inline": True
                },
                {
                    "name": "🎨 テーマタイプ",
                    "value": theme_data['type'],
                    "inline": True
                },
                {
                    "name": "📝 キャプション",
                    "value": caption[:100] + "..." if len(caption) > 100 else caption,
                    "inline": False
                },
                {
                    "name": "🏷️ ハッシュタグ",
                    "value": " ".join(hashtags),
                    "inline": False
                }
            ],
            "timestamp": datetime.utcnow().isoformat(),
            "footer": {
                "text": "Mocha Auto Posting System"
            }
        }
        
        # 投稿結果を追加
        posting_status = []
        for platform, result in posting_results.items():
            if result["success"]:
                status_emoji = "✅"
                status_text = f"[投稿を見る]({result['url']})" if result['url'] else "投稿成功"
            else:
                status_emoji = "❌"
                status_text = f"失敗: {result['error'][:50]}"
            
            posting_status.append(f"{status_emoji} **{platform.capitalize()}**: {status_text}")
        
        embed["fields"].append({
            "name": "📱 投稿先",
            "value": "\n".join(posting_status),
            "inline": False
        })
        
        # Webhookペイロードを構築
        payload = {
            "username": "モカ Bot",
            "avatar_url": "https://raw.githubusercontent.com/maruyama0616/coffee_penguin/master/Coffee_Penguin/coffee_penguin_website/public/images/mocha-icon.png",
            "embeds": [embed]
        }
        
        # 画像を添付（オプション）
        files = None
        if image_path and image_path.exists():
            files = {
                "file": (image_path.name, open(image_path, "rb"), "image/png")
            }
        
        try:
            # Webhookを送信
            response = requests.post(
                self.webhook_url,
                json=payload if not files else None,
                data={"payload_json": str(payload)} if files else None,
                files=files,
                timeout=10
            )
            
            response.raise_for_status()
            logger.info("Discord通知送信成功")
            return True
            
        except Exception as e:
            logger.error(f"Discord通知送信失敗: {e}")
            return False
        finally:
            if files:
                files["file"][1].close()
    
    def send_failure_notification(
        self,
        theme_data: Dict[str, Any],
        error_message: str,
        posting_results: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        投稿失敗通知を送信
        
        Args:
            theme_data: テーマ情報
            error_message: エラーメッセージ
            posting_results: 投稿結果（オプション）
        
        Returns:
            送信成功の真偽値
        """
        # 埋め込みメッセージを構築
        embed = {
            "title": "❌ モカの投稿に失敗しました",
            "description": f"**{theme_data['event_name']}**",
            "color": 0xFF0000,  # 赤色
            "fields": [
                {
                    "name": "📅 日付",
                    "value": theme_data['date'],
                    "inline": True
                },
                {
                    "name": "⚠️ エラー",
                    "value": error_message[:1000],
                    "inline": False
                }
            ],
            "timestamp": datetime.utcnow().isoformat(),
            "footer": {
                "text": "Mocha Auto Posting System"
            }
        }
        
        # 投稿結果がある場合は追加
        if posting_results:
            posting_status = []
            for platform, result in posting_results.items():
                if result["success"]:
                    posting_status.append(f"✅ **{platform.capitalize()}**: 成功")
                else:
                    posting_status.append(f"❌ **{platform.capitalize()}**: {result['error'][:50]}")
            
            embed["fields"].append({
                "name": "📱 投稿状況",
                "value": "\n".join(posting_status),
                "inline": False
            })
        
        # Webhookペイロードを構築
        payload = {
            "username": "モカ Bot",
            "avatar_url": "https://raw.githubusercontent.com/maruyama0616/coffee_penguin/master/Coffee_Penguin/coffee_penguin_website/public/images/mocha-icon.png",
            "embeds": [embed]
        }
        
        try:
            # Webhookを送信
            response = requests.post(
                self.webhook_url,
                json=payload,
                timeout=10
            )
            
            response.raise_for_status()
            logger.info("Discord失敗通知送信成功")
            return True
            
        except Exception as e:
            logger.error(f"Discord失敗通知送信失敗: {e}")
            return False
    
    def send_test_notification(self) -> bool:
        """
        テスト通知を送信
        
        Returns:
            送信成功の真偽値
        """
        payload = {
            "username": "モカ Bot",
            "avatar_url": "https://raw.githubusercontent.com/maruyama0616/coffee_penguin/master/Coffee_Penguin/coffee_penguin_website/public/images/mocha-icon.png",
            "content": "🧪 テスト通知: モカの自動投稿システムが正常に動作しています！☕️"
        }
        
        try:
            response = requests.post(
                self.webhook_url,
                json=payload,
                timeout=10
            )
            
            response.raise_for_status()
            logger.info("Discordテスト通知送信成功")
            return True
            
        except Exception as e:
            logger.error(f"Discordテスト通知送信失敗: {e}")
            return False


def main():
    """テスト実行"""
    from date_theme import DateThemeDetector
    from datetime import datetime
    
    # テーマを取得
    detector = DateThemeDetector()
    theme = detector.get_theme_for_date(datetime(2026, 2, 14))
    
    # テスト通知
    notifier = DiscordNotifier()
    
    # テスト通知
    print("=== テスト通知を送信 ===")
    notifier.send_test_notification()
    
    # 成功通知のテスト
    print("\n=== 成功通知を送信 ===")
    test_caption = "こんにちは、モカだよ☕️\n\nバレンタインデーだね！チョコレートとコーヒーの組み合わせは最高だよね。"
    test_hashtags = ["#モカ", "#CoffeePenguin", "#バレンタイン", "#チョコレート", "#コーヒー"]
    test_results = {
        "instagram": {"success": True, "error": None, "url": "https://www.instagram.com/p/test123/"},
        "twitter": {"success": True, "error": None, "url": "https://twitter.com/_coffeepenguin/status/123"},
        "threads": {"success": False, "error": "API認証エラー", "url": None}
    }
    
    notifier.send_success_notification(
        theme,
        test_caption,
        test_hashtags,
        test_results
    )


if __name__ == "__main__":
    main()
