#!/usr/bin/env python3
"""
画像・動画生成とCloudinaryアップロードスクリプト

このスクリプトは以下を実行します：
1. プロンプトから画像・動画を生成（Manus Antigravity API使用）
2. 生成されたファイルをCloudinaryにアップロード
3. ファイル名とURLをスプレッドシートに記録
"""

import os
import sys
import json
import requests
from datetime import datetime
from pathlib import Path
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# 環境変数を読み込み
load_dotenv()

# Cloudinaryの設定
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

# Manus Antigravity APIの設定
MANUS_API_KEY = os.getenv('MANUS_API_KEY')
MANUS_API_BASE_URL = "https://api.manus.im/v1"


def generate_image(prompt: str, filename: str, aspect_ratio: str = "3:4") -> str:
    """
    Manus Antigravity APIを使用して画像を生成
    
    Args:
        prompt: 画像生成プロンプト
        filename: 保存するファイル名（拡張子なし）
        aspect_ratio: アスペクト比（デフォルト: 3:4 Instagram縦長）
    
    Returns:
        生成された画像のローカルパス
    """
    print(f"🎨 画像生成中: {filename}")
    
    # Manus Antigravity APIで画像生成
    headers = {
        "Authorization": f"Bearer {MANUS_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "antigravity-v3",
        "prompt": prompt,
        "aspect_ratio": aspect_ratio,
        "num_images": 1
    }
    
    response = requests.post(
        f"{MANUS_API_BASE_URL}/images/generations",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        raise Exception(f"画像生成エラー: {response.status_code} - {response.text}")
    
    result = response.json()
    image_url = result['data'][0]['url']
    
    # 画像をダウンロード
    output_dir = Path("/home/ubuntu/coffee_penguin/generated_media")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    image_path = output_dir / f"{filename}.png"
    
    image_response = requests.get(image_url)
    with open(image_path, 'wb') as f:
        f.write(image_response.content)
    
    print(f"✅ 画像生成完了: {image_path}")
    return str(image_path)


def generate_video(prompt: str, filename: str, duration: int = 5) -> str:
    """
    Nano Bananaを使用して動画を生成
    
    Args:
        prompt: 動画生成プロンプト
        filename: 保存するファイル名（拡張子なし）
        duration: 動画の長さ（秒）
    
    Returns:
        生成された動画のローカルパス
    """
    print(f"🎬 動画生成中: {filename}")
    
    # Nano Banana APIで動画生成
    headers = {
        "Authorization": f"Bearer {MANUS_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "nano-banana-v1",
        "prompt": prompt,
        "duration": duration,
        "aspect_ratio": "9:16"  # Instagram Reels用
    }
    
    response = requests.post(
        f"{MANUS_API_BASE_URL}/videos/generations",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        raise Exception(f"動画生成エラー: {response.status_code} - {response.text}")
    
    result = response.json()
    video_url = result['data'][0]['url']
    
    # 動画をダウンロード
    output_dir = Path("/home/ubuntu/coffee_penguin/generated_media")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    video_path = output_dir / f"{filename}.mp4"
    
    video_response = requests.get(video_url)
    with open(video_path, 'wb') as f:
        f.write(video_response.content)
    
    print(f"✅ 動画生成完了: {video_path}")
    return str(video_path)


def upload_to_cloudinary(file_path: str, public_id: str, resource_type: str = "image") -> dict:
    """
    ファイルをCloudinaryにアップロード
    
    Args:
        file_path: アップロードするファイルのパス
        public_id: Cloudinary上でのファイル名（拡張子なし）
        resource_type: リソースタイプ（"image" or "video"）
    
    Returns:
        アップロード結果（URLなどを含む）
    """
    print(f"☁️  Cloudinaryにアップロード中: {public_id}")
    
    result = cloudinary.uploader.upload(
        file_path,
        public_id=public_id,
        resource_type=resource_type,
        unique_filename=False,
        overwrite=True,
        folder="mocha"  # Cloudinary上のフォルダ
    )
    
    print(f"✅ アップロード完了: {result['secure_url']}")
    
    return {
        'url': result['secure_url'],
        'public_id': result['public_id'],
        'format': result['format'],
        'resource_type': result['resource_type'],
        'created_at': result['created_at']
    }


def main():
    """
    メイン処理
    
    コマンドライン引数:
        --prompt: 生成プロンプト
        --filename: ファイル名（拡張子なし）
        --type: メディアタイプ（"image" or "video"）
        --aspect-ratio: アスペクト比（画像のみ、デフォルト: 3:4）
        --duration: 動画の長さ（動画のみ、デフォルト: 5秒）
    """
    import argparse
    
    parser = argparse.ArgumentParser(description='画像・動画生成とCloudinaryアップロード')
    parser.add_argument('--prompt', required=True, help='生成プロンプト')
    parser.add_argument('--filename', required=True, help='ファイル名（拡張子なし）')
    parser.add_argument('--type', choices=['image', 'video'], default='image', help='メディアタイプ')
    parser.add_argument('--aspect-ratio', default='3:4', help='アスペクト比（画像のみ）')
    parser.add_argument('--duration', type=int, default=5, help='動画の長さ（秒、動画のみ）')
    
    args = parser.parse_args()
    
    try:
        # メディア生成
        if args.type == 'image':
            file_path = generate_image(args.prompt, args.filename, args.aspect_ratio)
            resource_type = 'image'
        else:
            file_path = generate_video(args.prompt, args.filename, args.duration)
            resource_type = 'video'
        
        # Cloudinaryにアップロード
        upload_result = upload_to_cloudinary(file_path, args.filename, resource_type)
        
        # 結果を出力（JSON形式）
        output = {
            'filename': args.filename,
            'type': args.type,
            'local_path': file_path,
            'cloudinary_url': upload_result['url'],
            'cloudinary_public_id': upload_result['public_id'],
            'prompt': args.prompt,
            'timestamp': datetime.now().isoformat()
        }
        
        print("\n" + "="*60)
        print("📊 結果:")
        print(json.dumps(output, indent=2, ensure_ascii=False))
        print("="*60)
        
        # 結果をJSONファイルに保存
        result_file = Path("/home/ubuntu/coffee_penguin/generated_media") / f"{args.filename}_result.json"
        with open(result_file, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 結果を保存: {result_file}")
        
        return output
        
    except Exception as e:
        print(f"❌ エラー: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
