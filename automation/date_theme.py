"""
日付からテーマを判定するモジュール
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any
import calendar

from config import EVENTS_CALENDAR_PATH, TIMEZONE


class DateThemeDetector:
    """日付に基づいてテーマを判定するクラス"""
    
    def __init__(self, events_calendar_path: Path = EVENTS_CALENDAR_PATH):
        """
        初期化
        
        Args:
            events_calendar_path: イベントカレンダーJSONファイルのパス
        """
        with open(events_calendar_path, 'r', encoding='utf-8') as f:
            self.events_calendar = json.load(f)
    
    def get_theme_for_date(self, target_date: datetime = None) -> Dict[str, Any]:
        """
        指定された日付のテーマを取得
        
        Args:
            target_date: 対象日付（Noneの場合は今日）
        
        Returns:
            テーマ情報を含む辞書
        """
        if target_date is None:
            target_date = datetime.now()
        
        # 日付文字列を生成（MM-DD形式）
        date_key = target_date.strftime("%m-%d")
        
        # 1. 特定日付のイベントをチェック
        if date_key in self.events_calendar:
            event = self.events_calendar[date_key]
            return {
                "type": "special_event",
                "date": target_date.strftime("%Y-%m-%d"),
                "event_name": event["name"],
                "theme": event["theme"],
                "keywords": event["keywords"],
                "prompt_addition": event.get("prompt_addition", ""),
                "weekday": self._get_weekday_name(target_date)
            }
        
        # 2. 季節テーマをチェック
        month = target_date.month
        seasonal_theme = self._get_seasonal_theme(month)
        
        # 3. 曜日テーマを取得
        weekday_theme = self._get_weekday_theme(target_date)
        
        # 季節テーマと曜日テーマを組み合わせる
        return {
            "type": "seasonal_weekday",
            "date": target_date.strftime("%Y-%m-%d"),
            "event_name": f"{seasonal_theme['season_name']}の{weekday_theme['weekday_name']}",
            "theme": weekday_theme["theme"],
            "keywords": seasonal_theme["keywords"] + weekday_theme["keywords"],
            "prompt_addition": seasonal_theme["prompt_addition"],
            "weekday": weekday_theme["weekday_name"],
            "season": seasonal_theme["season_name"]
        }
    
    def _get_seasonal_theme(self, month: int) -> Dict[str, Any]:
        """
        月から季節テーマを取得
        
        Args:
            month: 月（1-12）
        
        Returns:
            季節テーマ情報
        """
        seasonal_data = self.events_calendar["seasonal"]
        
        for season, data in seasonal_data.items():
            if month in data["months"]:
                return {
                    "season_name": self._get_season_japanese_name(season),
                    "theme": data["theme"],
                    "keywords": data["keywords"],
                    "prompt_addition": data["prompt_addition"]
                }
        
        # デフォルト（念のため）
        return {
            "season_name": "日常",
            "theme": self.events_calendar["default"]["theme"],
            "keywords": self.events_calendar["default"]["keywords"],
            "prompt_addition": self.events_calendar["default"]["prompt_addition"]
        }
    
    def _get_weekday_theme(self, target_date: datetime) -> Dict[str, Any]:
        """
        曜日テーマを取得
        
        Args:
            target_date: 対象日付
        
        Returns:
            曜日テーマ情報
        """
        weekday_names = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        weekday_japanese = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"]
        
        weekday_index = target_date.weekday()
        weekday_key = weekday_names[weekday_index]
        weekday_data = self.events_calendar["weekday"][weekday_key]
        
        return {
            "weekday_name": weekday_japanese[weekday_index],
            "theme": weekday_data["theme"],
            "keywords": weekday_data["keywords"]
        }
    
    def _get_season_japanese_name(self, season: str) -> str:
        """
        英語の季節名を日本語に変換
        
        Args:
            season: 英語の季節名
        
        Returns:
            日本語の季節名
        """
        season_map = {
            "spring": "春",
            "summer": "夏",
            "autumn": "秋",
            "winter": "冬"
        }
        return season_map.get(season, "日常")
    
    def _get_weekday_name(self, target_date: datetime) -> str:
        """
        日付から曜日名（日本語）を取得
        
        Args:
            target_date: 対象日付
        
        Returns:
            曜日名（日本語）
        """
        weekday_japanese = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"]
        return weekday_japanese[target_date.weekday()]
    
    def get_weather_theme(self, weather_condition: str) -> Dict[str, Any]:
        """
        天気に基づいたテーマを取得（オプション機能）
        
        Args:
            weather_condition: 天気状態 ("rainy", "sunny", "snowy")
        
        Returns:
            天気テーマ情報
        """
        weather_data = self.events_calendar["weather"]
        
        if weather_condition in weather_data:
            return weather_data[weather_condition]
        
        return self.events_calendar["default"]


def main():
    """テスト実行"""
    detector = DateThemeDetector()
    
    # 今日のテーマを取得
    today_theme = detector.get_theme_for_date()
    print("=== 今日のテーマ ===")
    print(json.dumps(today_theme, ensure_ascii=False, indent=2))
    
    # バレンタインデーのテーマを取得
    valentine = datetime(2026, 2, 14)
    valentine_theme = detector.get_theme_for_date(valentine)
    print("\n=== バレンタインデーのテーマ ===")
    print(json.dumps(valentine_theme, ensure_ascii=False, indent=2))
    
    # モカの誕生日のテーマを取得
    birthday = datetime(2026, 6, 1)
    birthday_theme = detector.get_theme_for_date(birthday)
    print("\n=== モカの誕生日のテーマ ===")
    print(json.dumps(birthday_theme, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
