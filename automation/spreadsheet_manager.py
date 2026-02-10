#!/usr/bin/env python3
"""
Google Spreadsheet連携スクリプト

このスクリプトは以下を実行します：
1. Google Sheetsに接続
2. ファイル名とURLをA列に追加
"""

import os
import sys
import json
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv

# 環境変数を読み込み
load_dotenv()

# Google Sheets APIのスコープ
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]


class SpreadsheetManager:
    """Google Spreadsheet管理クラス"""
    
    def __init__(self, credentials_path: str = None, spreadsheet_id: str = None):
        """
        初期化
        
        Args:
            credentials_path: サービスアカウントのJSONファイルパス
            spreadsheet_id: スプレッドシートID
        """
        self.credentials_path = credentials_path or os.getenv('GOOGLE_CREDENTIALS_PATH')
        self.spreadsheet_id = spreadsheet_id or os.getenv('GOOGLE_SPREADSHEET_ID')
        
        if not self.credentials_path:
            raise ValueError("GOOGLE_CREDENTIALS_PATH環境変数が設定されていません")
        
        if not self.spreadsheet_id:
            raise ValueError("GOOGLE_SPREADSHEET_ID環境変数が設定されていません")
        
        # 認証
        self.client = self._authenticate()
        self.spreadsheet = self.client.open_by_key(self.spreadsheet_id)
    
    def _authenticate(self):
        """Google Sheets APIに認証"""
        credentials = Credentials.from_service_account_file(
            self.credentials_path,
            scopes=SCOPES
        )
        return gspread.authorize(credentials)
    
    def append_row(self, worksheet_name: str, values: list):
        """
        行を追加
        
        Args:
            worksheet_name: ワークシート名
            values: 追加する値のリスト
        """
        try:
            worksheet = self.spreadsheet.worksheet(worksheet_name)
        except gspread.exceptions.WorksheetNotFound:
            # ワークシートが存在しない場合は作成
            worksheet = self.spreadsheet.add_worksheet(
                title=worksheet_name,
                rows=1000,
                cols=10
            )
            # ヘッダー行を追加
            worksheet.append_row([
                'ファイル名',
                'Cloudinary URL',
                'タイプ',
                'プロンプト',
                '生成日時'
            ])
        
        worksheet.append_row(values)
        print(f"✅ スプレッドシートに追加: {values[0]}")
    
    def add_media_record(
        self,
        filename: str,
        cloudinary_url: str,
        media_type: str,
        prompt: str,
        worksheet_name: str = "メディア管理"
    ):
        """
        メディア記録を追加
        
        Args:
            filename: ファイル名
            cloudinary_url: Cloudinary URL
            media_type: メディアタイプ（image or video）
            prompt: 生成プロンプト
            worksheet_name: ワークシート名
        """
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        values = [
            filename,
            cloudinary_url,
            media_type,
            prompt,
            timestamp
        ]
        
        self.append_row(worksheet_name, values)
    
    def get_all_records(self, worksheet_name: str = "メディア管理") -> list:
        """
        すべてのレコードを取得
        
        Args:
            worksheet_name: ワークシート名
        
        Returns:
            レコードのリスト
        """
        try:
            worksheet = self.spreadsheet.worksheet(worksheet_name)
            return worksheet.get_all_records()
        except gspread.exceptions.WorksheetNotFound:
            return []
    
    def find_by_filename(self, filename: str, worksheet_name: str = "メディア管理") -> dict:
        """
        ファイル名でレコードを検索
        
        Args:
            filename: ファイル名
            worksheet_name: ワークシート名
        
        Returns:
            レコード（見つからない場合はNone）
        """
        records = self.get_all_records(worksheet_name)
        for record in records:
            if record.get('ファイル名') == filename:
                return record
        return None


def main():
    """
    メイン処理
    
    コマンドライン引数:
        --filename: ファイル名
        --url: Cloudinary URL
        --type: メディアタイプ（"image" or "video"）
        --prompt: 生成プロンプト
        --worksheet: ワークシート名（デフォルト: メディア管理）
    """
    import argparse
    
    parser = argparse.ArgumentParser(description='Google Spreadsheet連携')
    parser.add_argument('--filename', required=True, help='ファイル名')
    parser.add_argument('--url', required=True, help='Cloudinary URL')
    parser.add_argument('--type', choices=['image', 'video'], required=True, help='メディアタイプ')
    parser.add_argument('--prompt', required=True, help='生成プロンプト')
    parser.add_argument('--worksheet', default='メディア管理', help='ワークシート名')
    
    args = parser.parse_args()
    
    try:
        manager = SpreadsheetManager()
        manager.add_media_record(
            filename=args.filename,
            cloudinary_url=args.url,
            media_type=args.type,
            prompt=args.prompt,
            worksheet_name=args.worksheet
        )
        
        print("\n" + "="*60)
        print("📊 スプレッドシートに記録完了")
        print("="*60)
        
    except Exception as e:
        print(f"❌ エラー: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
