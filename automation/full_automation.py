#!/usr/bin/env python3
"""
完全自動化スクリプト

このスクリプトは以下を一気通貫で実行します：
1. プロンプトから画像・動画を生成
2. Cloudinaryに自動アップロード
3. ファイル名とURLをスプレッドシートに記録
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path

# 同じディレクトリの他のモジュールをインポート
from generate_upload_cloudinary import generate_image, generate_video, upload_to_cloudinary
from spreadsheet_manager import SpreadsheetManager


def generate_filename(prefix: str = "mocha") -> str:
    """
    ユニークなファイル名を生成
    
    Args:
        prefix: ファイル名のプレフィックス
    
    Returns:
        ファイル名（拡張子なし）
    """
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    return f"{prefix}_{timestamp}"


def main():
    """
    メイン処理
    
    コマンドライン引数:
        --prompt: 生成プロンプト
        --type: メディアタイプ（"image" or "video"）
        --prefix: ファイル名のプレフィックス（デフォルト: mocha）
        --aspect-ratio: アスペクト比（画像のみ、デフォルト: 3:4）
        --duration: 動画の長さ（動画のみ、デフォルト: 5秒）
        --worksheet: スプレッドシートのワークシート名（デフォルト: メディア管理）
    """
    parser = argparse.ArgumentParser(description='画像・動画生成→Cloudinaryアップロード→スプレッドシート記録')
    parser.add_argument('--prompt', required=True, help='生成プロンプト')
    parser.add_argument('--type', choices=['image', 'video'], default='image', help='メディアタイプ')
    parser.add_argument('--prefix', default='mocha', help='ファイル名のプレフィックス')
    parser.add_argument('--aspect-ratio', default='3:4', help='アスペクト比（画像のみ）')
    parser.add_argument('--duration', type=int, default=5, help='動画の長さ（秒、動画のみ）')
    parser.add_argument('--worksheet', default='メディア管理', help='ワークシート名')
    
    args = parser.parse_args()
    
    try:
        print("="*60)
        print("🚀 完全自動化処理を開始")
        print("="*60)
        
        # ステップ1: ユニークなファイル名を生成
        filename = generate_filename(args.prefix)
        print(f"\n📝 ファイル名: {filename}")
        
        # ステップ2: メディア生成
        print(f"\n🎨 ステップ1: {args.type}を生成中...")
        if args.type == 'image':
            file_path = generate_image(args.prompt, filename, args.aspect_ratio)
            resource_type = 'image'
        else:
            file_path = generate_video(args.prompt, filename, args.duration)
            resource_type = 'video'
        
        # ステップ3: Cloudinaryにアップロード
        print(f"\n☁️  ステップ2: Cloudinaryにアップロード中...")
        upload_result = upload_to_cloudinary(file_path, filename, resource_type)
        cloudinary_url = upload_result['url']
        
        # ステップ4: スプレッドシートに記録
        print(f"\n📊 ステップ3: スプレッドシートに記録中...")
        manager = SpreadsheetManager()
        manager.add_media_record(
            filename=filename,
            cloudinary_url=cloudinary_url,
            media_type=args.type,
            prompt=args.prompt,
            worksheet_name=args.worksheet
        )
        
        # 結果を出力
        result = {
            'filename': filename,
            'type': args.type,
            'local_path': file_path,
            'cloudinary_url': cloudinary_url,
            'prompt': args.prompt,
            'timestamp': datetime.now().isoformat()
        }
        
        print("\n" + "="*60)
        print("✅ 完全自動化処理が完了しました！")
        print("="*60)
        print("\n📊 結果:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        print("="*60)
        
        # 結果をJSONファイルに保存
        result_file = Path("/home/ubuntu/coffee_penguin/generated_media") / f"{filename}_full_result.json"
        with open(result_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 結果を保存: {result_file}")
        
        # N8N用のWebhookペイロードを出力
        webhook_payload = {
            'image_url': cloudinary_url,
            'theme': args.prompt,
            'event_name': filename,
            'description': args.prompt,
            'keywords': [args.prefix, args.type],
            'date': datetime.now().strftime('%Y-%m-%d')
        }
        
        print("\n" + "="*60)
        print("🔗 N8N Webhookペイロード:")
        print(json.dumps(webhook_payload, indent=2, ensure_ascii=False))
        print("="*60)
        
        return result
        
    except Exception as e:
        print(f"\n❌ エラー: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
