#!/usr/bin/env python3
"""
N8N Webhookトリガースクリプト

このスクリプトは、生成されたペイロードをN8N Webhookに送信します。
"""

import os
import json
import requests
from typing import Dict, Any

def trigger_n8n_webhook(webhook_url: str, payload: Dict[str, Any]) -> bool:
    """
    N8N Webhookをトリガー
    
    Args:
        webhook_url: N8N Webhook URL
        payload: 送信するペイロード
        
    Returns:
        成功した場合True
    """
    try:
        response = requests.post(
            webhook_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        if response.status_code == 200:
            print("✅ N8N Webhookトリガー成功")
            print(f"レスポンス: {response.text}")
            return True
        else:
            print(f"❌ N8N Webhookトリガー失敗: {response.status_code}")
            print(f"レスポンス: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ N8N Webhookタイムアウト（30秒）")
        return False
    except requests.exceptions.RequestException as e:
        print(f"❌ N8N Webhookエラー: {e}")
        return False

def main():
    print("🚀 N8N Webhookトリガーを開始...")
    
    # N8N Webhook URL取得
    webhook_url = os.getenv('N8N_WEBHOOK_URL')
    if not webhook_url:
        print("❌ N8N_WEBHOOK_URL環境変数が設定されていません")
        print("GitHub Secretsに設定してください")
        exit(1)
    
    print(f"🔗 Webhook URL: {webhook_url[:50]}...")
    
    # ペイロード読み込み
    payload_path = 'n8n_payload.json'
    try:
        with open(payload_path, 'r', encoding='utf-8') as f:
            payload = json.load(f)
    except FileNotFoundError:
        print(f"❌ ペイロードファイルが見つかりません: {payload_path}")
        print("generate_and_upload.pyを先に実行してください")
        exit(1)
    
    print("\n📦 送信するペイロード:")
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    
    # N8N Webhookをトリガー
    print("\n📤 N8N Webhookに送信中...")
    success = trigger_n8n_webhook(webhook_url, payload)
    
    if success:
        print("\n🎉 N8Nワークフローが正常にトリガーされました！")
        print("Instagram投稿が開始されます...")
    else:
        print("\n❌ N8Nワークフローのトリガーに失敗しました")
        exit(1)

if __name__ == "__main__":
    main()
