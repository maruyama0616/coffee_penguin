"""
画像生成モジュール（Manus Antigravity API使用）
"""

import os
import requests
import time
from pathlib import Path
from typing import Dict, Any, Optional
import logging

from config import (
    MANUS_API_KEY,
    IMAGE_GENERATION,
    MOCHA_CHARACTER,
    RETRY_SETTINGS
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ImageGenerator:
    """Manus Antigravity APIを使用した画像生成クラス"""
    
    def __init__(self, api_key: str = MANUS_API_KEY):
        """
        初期化
        
        Args:
            api_key: Manus API キー
        """
        self.api_key = api_key
        self.base_url = "https://api.manus.im/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def generate_image(
        self,
        theme_data: Dict[str, Any],
        output_path: Path
    ) -> Optional[Path]:
        """
        テーマに基づいて画像を生成
        
        Args:
            theme_data: テーマ情報
            output_path: 保存先パス
        
        Returns:
            生成された画像のパス（失敗時はNone）
        """
        # プロンプトを構築
        prompt = self._build_prompt(theme_data)
        logger.info(f"画像生成プロンプト: {prompt}")
        
        # 画像生成APIを呼び出し
        for attempt in range(RETRY_SETTINGS["max_attempts"]):
            try:
                image_url = self._call_generation_api(prompt)
                
                if image_url:
                    # 画像をダウンロード
                    self._download_image(image_url, output_path)
                    logger.info(f"画像生成成功: {output_path}")
                    return output_path
                
            except Exception as e:
                logger.error(f"画像生成失敗 (試行 {attempt + 1}/{RETRY_SETTINGS['max_attempts']}): {e}")
                
                if attempt < RETRY_SETTINGS["max_attempts"] - 1:
                    delay = RETRY_SETTINGS["initial_delay"] * (RETRY_SETTINGS["backoff_factor"] ** attempt)
                    logger.info(f"{delay}秒後にリトライします...")
                    time.sleep(delay)
        
        logger.error("画像生成に失敗しました")
        return None
    
    def _build_prompt(self, theme_data: Dict[str, Any]) -> str:
        """
        テーマデータからプロンプトを構築
        
        Args:
            theme_data: テーマ情報
        
        Returns:
            画像生成プロンプト
        """
        # ベースプロンプト
        base_prompt = f"""A cute coffee penguin character named Mocha.
{MOCHA_CHARACTER['appearance']}.
{theme_data.get('prompt_addition', '')}.
Kawaii style, soft pastel colors, warm and cozy atmosphere.
Professional illustration, high quality, detailed.
No text, no watermark."""
        
        return base_prompt
    
    def _call_generation_api(self, prompt: str) -> Optional[str]:
        """
        Manus Antigravity APIを呼び出して画像を生成
        
        Args:
            prompt: 画像生成プロンプト
        
        Returns:
            生成された画像のURL（失敗時はNone）
        """
        # Note: 実際のManus Antigravity APIのエンドポイントとパラメータは
        # 公式ドキュメントに従って調整する必要があります
        
        payload = {
            "model": IMAGE_GENERATION["model"],
            "prompt": prompt,
            "width": IMAGE_GENERATION["width"],
            "height": IMAGE_GENERATION["height"],
            "watermark": IMAGE_GENERATION["watermark"],
            "style": IMAGE_GENERATION["style"]
        }
        
        # APIエンドポイント（実際のエンドポイントに要調整）
        endpoint = f"{self.base_url}/images/generate"
        
        response = requests.post(
            endpoint,
            headers=self.headers,
            json=payload,
            timeout=60
        )
        
        response.raise_for_status()
        result = response.json()
        
        # レスポンスから画像URLを取得（実際のレスポンス構造に要調整）
        image_url = result.get("data", {}).get("url")
        
        return image_url
    
    def _download_image(self, image_url: str, output_path: Path) -> None:
        """
        画像をダウンロードして保存
        
        Args:
            image_url: 画像URL
            output_path: 保存先パス
        """
        response = requests.get(image_url, timeout=30)
        response.raise_for_status()
        
        # ディレクトリが存在しない場合は作成
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # 画像を保存
        with open(output_path, 'wb') as f:
            f.write(response.content)
        
        logger.info(f"画像をダウンロードしました: {output_path}")


def main():
    """テスト実行"""
    from date_theme import DateThemeDetector
    from datetime import datetime
    
    # テーマを取得
    detector = DateThemeDetector()
    theme = detector.get_theme_for_date(datetime(2026, 2, 14))  # バレンタイン
    
    # 画像生成
    generator = ImageGenerator()
    output_path = Path("/tmp/test_mocha_valentine.png")
    
    result = generator.generate_image(theme, output_path)
    
    if result:
        print(f"✅ 画像生成成功: {result}")
    else:
        print("❌ 画像生成失敗")


if __name__ == "__main__":
    main()
