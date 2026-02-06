#!/usr/bin/env python3
"""
画像生成とCloudinaryアップロードスクリプト

このスクリプトは以下の処理を行います:
1. 日付に基づいてテーマを判定
2. Manus Antigravity APIで画像を生成
3. Cloudinaryにアップロード
4. N8N用のペイロードを生成
"""

import os
import json
from datetime import datetime
from date_theme import DateThemeDetector
from image_generator import generate_image

def upload_to_cloudinary(image_path: str, public_id: str) -> dict:
    """
    Cloudinaryに画像をアップロード
    
    Args:
        image_path: ローカル画像パス
        public_id: Cloudinary上のID
        
    Returns:
        アップロード結果（URLを含む）
    """
    try:
        import cloudinary
        import cloudinary.uploader
        
        # Cloudinary設定
        cloudinary.config(
            cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
            api_key=os.getenv('CLOUDINARY_API_KEY'),
            api_secret=os.getenv('CLOUDINARY_API_SECRET')
        )
        
        # アップロード
        result = cloudinary.uploader.upload(
            image_path,
            folder="mocha_instagram",
            public_id=public_id,
            overwrite=True,
            resource_type="image"
        )
        
        return result
    except ImportError:
        print("⚠️ cloudinaryパッケージがインストールされていません")
        print("pip install cloudinary を実行してください")
        raise
    except Exception as e:
        print(f"❌ Cloudinaryアップロードエラー: {e}")
        raise

def main():
    print("🚀 画像生成とCloudinaryアップロードを開始...")
    
    # 1. 日付とテーマ取得
    today = datetime.now()
    print(f"📅 日付: {today.strftime('%Y-%m-%d')}")
    
    detector = DateThemeDetector()
    theme = detector.get_theme_for_date(today)
    print(f"🎨 テーマ: {theme['theme']}")
    print(f"📝 イベント: {theme['event_name']}")
    print(f"🔑 キーワード: {', '.join(theme['keywords'])}")
    
    # 2. 画像生成
    print("🖼️ 画像を生成中...")
    image_path = generate_image(theme)
    print(f"✅ 画像生成完了: {image_path}")
    
    # 3. Cloudinaryにアップロード
    print("☁️ Cloudinaryにアップロード中...")
    public_id = f"mocha_{today.strftime('%Y%m%d_%H%M%S')}"
    result = upload_to_cloudinary(image_path, public_id)
    print(f"✅ アップロード完了: {result['secure_url']}")
    
    # 4. N8N用のペイロードを生成
    output = {
        "image_url": result['secure_url'],
        "theme": theme['theme'],
        "event_name": theme['event_name'],
        "description": theme.get('prompt_addition', ''),
        "keywords": theme['keywords'],
        "date": today.strftime('%Y-%m-%d'),
        "timestamp": today.isoformat()
    }
    
    # ペイロードを保存
    payload_path = 'n8n_payload.json'
    with open(payload_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✅ ペイロード保存完了: {payload_path}")
    print("\n📦 生成されたペイロード:")
    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
