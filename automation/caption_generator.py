"""
キャプション・ハッシュタグ生成モジュール（OpenAI API使用）
"""

import os
from openai import OpenAI
from typing import Dict, Any, List, Tuple
import logging
import random

from config import (
    OPENAI_API_KEY,
    CAPTION_GENERATION,
    HASHTAG_SETTINGS,
    MOCHA_CHARACTER,
    POSTING_SETTINGS
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CaptionGenerator:
    """OpenAI APIを使用したキャプション・ハッシュタグ生成クラス"""
    
    def __init__(self, api_key: str = OPENAI_API_KEY):
        """
        初期化
        
        Args:
            api_key: OpenAI API キー
        """
        self.client = OpenAI(api_key=api_key)
        self.model = CAPTION_GENERATION["model"]
    
    def generate_caption_and_hashtags(
        self,
        theme_data: Dict[str, Any],
        platform: str = "instagram"
    ) -> Tuple[str, List[str]]:
        """
        テーマに基づいてキャプションとハッシュタグを生成
        
        Args:
            theme_data: テーマ情報
            platform: 投稿先プラットフォーム ("instagram", "twitter", "threads")
        
        Returns:
            (キャプション, ハッシュタグリスト)のタプル
        """
        # プラットフォーム別の文字数制限
        max_length = POSTING_SETTINGS[platform]["caption_max_length"]
        
        # プロンプトを構築
        prompt = self._build_prompt(theme_data, platform, max_length)
        
        try:
            # OpenAI APIを呼び出し
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": self._get_system_prompt()
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.8,  # 創造性を高める
                max_tokens=500
            )
            
            # レスポンスをパース
            content = response.choices[0].message.content.strip()
            caption, hashtags = self._parse_response(content)
            
            logger.info(f"キャプション生成成功 ({platform})")
            return caption, hashtags
            
        except Exception as e:
            logger.error(f"キャプション生成失敗: {e}")
            # フォールバック: デフォルトキャプションを返す
            return self._generate_fallback_caption(theme_data, platform)
    
    def _get_system_prompt(self) -> str:
        """
        システムプロンプトを取得
        
        Returns:
            システムプロンプト
        """
        return f"""あなたは「{MOCHA_CHARACTER['name']}」というキャラクターです。

【キャラクター設定】
- 種族: {MOCHA_CHARACTER['species']}
- 性格: {MOCHA_CHARACTER['personality']}
- 一人称: {MOCHA_CHARACTER['first_person']}
- 口調: {MOCHA_CHARACTER['tone']}

【投稿スタイル】
- 親しみやすく、温かい文章
- 絵文字は控えめ（1〜2個程度）
- フォロワーとの対話を意識
- 読みやすい改行を使用

【タスク】
テーマに基づいて、SNS投稿用のキャプションとハッシュタグを生成してください。"""
    
    def _build_prompt(
        self,
        theme_data: Dict[str, Any],
        platform: str,
        max_length: int
    ) -> str:
        """
        ユーザープロンプトを構築
        
        Args:
            theme_data: テーマ情報
            platform: プラットフォーム
            max_length: 最大文字数
        
        Returns:
            ユーザープロンプト
        """
        return f"""以下のテーマで{platform}投稿用のキャプションとハッシュタグを生成してください。

【テーマ情報】
- 日付: {theme_data['date']}
- イベント: {theme_data['event_name']}
- テーマ: {theme_data['theme']}
- キーワード: {', '.join(theme_data['keywords'])}

【要件】
- キャプションは{max_length}文字以内
- ハッシュタグは5個（日本語と英語を混在）
- モカの一人称は「{MOCHA_CHARACTER['first_person']}」
- 親しみやすく温かい口調
- フォロワーへの問いかけを含める

【出力フォーマット】
キャプション本文

---
#ハッシュタグ1 #ハッシュタグ2 #ハッシュタグ3 #ハッシュタグ4 #ハッシュタグ5"""
    
    def _parse_response(self, content: str) -> Tuple[str, List[str]]:
        """
        APIレスポンスをパースしてキャプションとハッシュタグに分割
        
        Args:
            content: APIレスポンス
        
        Returns:
            (キャプション, ハッシュタグリスト)のタプル
        """
        # "---"で分割
        if "---" in content:
            parts = content.split("---")
            caption = parts[0].strip()
            hashtags_text = parts[1].strip() if len(parts) > 1 else ""
        else:
            # フォールバック: 最後の行をハッシュタグとみなす
            lines = content.strip().split("\n")
            caption = "\n".join(lines[:-1]).strip()
            hashtags_text = lines[-1].strip()
        
        # ハッシュタグを抽出
        hashtags = [tag.strip() for tag in hashtags_text.split() if tag.startswith("#")]
        
        # ハッシュタグが5個未満の場合は補完
        if len(hashtags) < 5:
            hashtags.extend(self._get_default_hashtags(5 - len(hashtags)))
        
        # 5個に制限
        hashtags = hashtags[:5]
        
        return caption, hashtags
    
    def _get_default_hashtags(self, count: int) -> List[str]:
        """
        デフォルトハッシュタグを取得
        
        Args:
            count: 必要な個数
        
        Returns:
            ハッシュタグリスト
        """
        available_tags = HASHTAG_SETTINGS["brand_tags"] + HASHTAG_SETTINGS["community_tags"]
        return random.sample(available_tags, min(count, len(available_tags)))
    
    def _generate_fallback_caption(
        self,
        theme_data: Dict[str, Any],
        platform: str
    ) -> Tuple[str, List[str]]:
        """
        フォールバック用のデフォルトキャプションを生成
        
        Args:
            theme_data: テーマ情報
            platform: プラットフォーム
        
        Returns:
            (キャプション, ハッシュタグリスト)のタプル
        """
        caption = f"""こんにちは、モカだよ☕️

{theme_data['theme']}

みんなは今日どんなコーヒーを飲んでる？"""
        
        hashtags = [
            "#モカ",
            "#CoffeePenguin",
            "#コーヒータイム",
            "#癒し",
            "#かわいい"
        ]
        
        return caption, hashtags


def main():
    """テスト実行"""
    from date_theme import DateThemeDetector
    from datetime import datetime
    
    # テーマを取得
    detector = DateThemeDetector()
    theme = detector.get_theme_for_date(datetime(2026, 2, 14))  # バレンタイン
    
    # キャプション生成
    generator = CaptionGenerator()
    caption, hashtags = generator.generate_caption_and_hashtags(theme, "instagram")
    
    print("=== 生成されたキャプション ===")
    print(caption)
    print("\n=== ハッシュタグ ===")
    print(" ".join(hashtags))


if __name__ == "__main__":
    main()
