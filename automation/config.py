"""
モカSNS自動投稿システム - 設定ファイル
"""

import os
from pathlib import Path

# ベースディレクトリ
BASE_DIR = Path(__file__).parent
REPO_ROOT = BASE_DIR.parent
ARCHIVE_DIR = REPO_ROOT / "archive"
EVENTS_CALENDAR_PATH = BASE_DIR / "events_calendar.json"

# API Keys (環境変数から取得)
MANUS_API_KEY = os.getenv("MANUS_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Instagram設定
INSTAGRAM_USERNAME = os.getenv("INSTAGRAM_USERNAME", "_coffeepenguin")
INSTAGRAM_PASSWORD = os.getenv("INSTAGRAM_PASSWORD")

# X (Twitter)設定
TWITTER_API_KEY = os.getenv("TWITTER_API_KEY")
TWITTER_API_SECRET = os.getenv("TWITTER_API_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_SECRET = os.getenv("TWITTER_ACCESS_SECRET")

# Threads設定
THREADS_ACCESS_TOKEN = os.getenv("THREADS_ACCESS_TOKEN")

# Discord設定
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

# モカのキャラクター設定
MOCHA_CHARACTER = {
    "name": "モカ (Mocha)",
    "species": "コーヒーペンギン (Coffee Penguin)",
    "personality": "人懐っこくて好奇心旺盛。コーヒーを淹れることと飲むことが大好き。",
    "appearance": "頭の上にコーヒーポットの蓋を被り、いつも持っているコーヒーカップ",
    "first_person": "ぼく",
    "tone": "親しみやすく、温かい口調",
    "birthday": "6月",
    "mbti": "ENFP"
}

# 画像生成設定
IMAGE_GENERATION = {
    "model": "nanobanan-pro",  # Nanobanan Pro
    "watermark": False,  # ウォーターマークなし
    "width": 1080,  # Instagram推奨サイズ
    "height": 1080,
    "style": "kawaii illustration, soft colors, professional, warm atmosphere"
}

# キャプション生成設定
CAPTION_GENERATION = {
    "model": "gpt-4.1-mini",
    "max_length": 200,  # 文字数目安
    "tone": "friendly and warm",
    "include_emoji": True,
    "emoji_limit": 2
}

# ハッシュタグ設定
HASHTAG_SETTINGS = {
    "count": 5,
    "brand_tags": ["#モカ", "#CoffeePenguin"],
    "community_tags": ["#カフェ好き", "#コーヒータイム", "#癒し", "#かわいい", "#ペンギン"],
    "mix_languages": True  # 日本語と英語を混在
}

# SNS投稿設定
POSTING_SETTINGS = {
    "instagram": {
        "enabled": True,
        "caption_max_length": 2200
    },
    "twitter": {
        "enabled": True,
        "caption_max_length": 280
    },
    "threads": {
        "enabled": True,
        "caption_max_length": 500
    }
}

# リトライ設定
RETRY_SETTINGS = {
    "max_attempts": 3,
    "backoff_factor": 2,  # 指数バックオフ
    "initial_delay": 1  # 初回遅延（秒）
}

# タイムゾーン
TIMEZONE = "Asia/Tokyo"

# ログ設定
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
