# モカSNS自動投稿システム

モカ（Coffee Penguin）のSNS投稿を完全自動化するシステムです。

## 機能

- **日付ベースのテーマ判定**: 記念日・季節・曜日に応じたテーマを自動判定
- **AI画像生成**: Manus Antigravity（Nanobanan Pro）でウォーターマークなしの画像を生成
- **AIキャプション生成**: OpenAI APIでモカのキャラクター性を反映したキャプションを生成
- **ハッシュタグ自動生成**: 5個のハッシュタグを自動生成
- **マルチプラットフォーム投稿**: Instagram、X (Twitter)、Threadsに同時投稿
- **Discord通知**: 投稿結果をDiscordに通知
- **アーカイブ保存**: 生成した画像・キャプション・メタデータを自動保存

## システム構成

```
automation/
├── main.py                 # メインスクリプト
├── config.py               # 設定ファイル
├── date_theme.py           # 日付→テーマ判定
├── image_generator.py      # 画像生成
├── caption_generator.py    # キャプション生成
├── social_poster.py        # SNS投稿
├── discord_notifier.py     # Discord通知
├── events_calendar.json    # イベントカレンダー
├── requirements.txt        # 依存パッケージ
└── README.md              # このファイル
```

## セットアップ

### 1. 依存パッケージのインストール

```bash
cd automation
pip install -r requirements.txt
```

### 2. 環境変数の設定

GitHub Secretsに以下の環境変数を設定してください：

| 変数名 | 説明 | 取得方法 |
|--------|------|---------|
| `MANUS_API_KEY` | Manus API キー | Manus設定から取得 |
| `OPENAI_API_KEY` | OpenAI API キー | OpenAI Platformから取得 |
| `INSTAGRAM_USERNAME` | Instagramユーザー名 | `_coffeepenguin` |
| `INSTAGRAM_PASSWORD` | Instagramパスワード | アカウント設定 |
| `TWITTER_API_KEY` | X API Key | Twitter Developer Portal |
| `TWITTER_API_SECRET` | X API Secret | Twitter Developer Portal |
| `TWITTER_ACCESS_TOKEN` | X Access Token | Twitter Developer Portal |
| `TWITTER_ACCESS_SECRET` | X Access Token Secret | Twitter Developer Portal |
| `THREADS_ACCESS_TOKEN` | Threads Access Token | Meta for Developers |
| `DISCORD_WEBHOOK_URL` | Discord Webhook URL | Discordサーバー設定 |

### 3. GitHub Secretsの設定方法

1. GitHubリポジトリページを開く
2. `Settings` → `Secrets and variables` → `Actions`
3. `New repository secret` をクリック
4. 各シークレットを追加

## 使用方法

### 自動実行（GitHub Actions）

毎日19:00 JST（10:00 UTC）に自動実行されます。

### 手動実行

#### ローカルで実行

```bash
cd automation

# 環境変数を設定
export MANUS_API_KEY="your_key"
export OPENAI_API_KEY="your_key"
# ... 他の環境変数も設定

# 実行
python main.py
```

#### GitHub Actionsで手動実行

1. GitHubリポジトリページを開く
2. `Actions` タブをクリック
3. `モカ自動投稿` ワークフローを選択
4. `Run workflow` をクリック

## テスト実行

各モジュールを個別にテストできます：

```bash
# 日付テーマ判定のテスト
python date_theme.py

# 画像生成のテスト
python image_generator.py

# キャプション生成のテスト
python caption_generator.py

# Discord通知のテスト
python discord_notifier.py
```

## イベントカレンダーのカスタマイズ

`events_calendar.json` を編集して、新しいイベントを追加できます：

```json
{
  "MM-DD": {
    "name": "イベント名",
    "theme": "テーマ説明",
    "keywords": ["キーワード1", "キーワード2"],
    "prompt_addition": "画像生成プロンプトへの追加文"
  }
}
```

## トラブルシューティング

### Instagram投稿が失敗する

- **原因**: アカウント凍結リスク、2FA認証、セッション期限切れ
- **対策**: 
  - セッションファイル（`instagram_session.json`）を確認
  - 2FAが有効な場合は無効化するか、App Passwordを使用
  - 投稿頻度を減らす（1日1回推奨）

### X (Twitter)投稿が失敗する

- **原因**: API権限不足、トークン期限切れ
- **対策**:
  - Twitter Developer Portalで権限を確認
  - Elevated accessが有効か確認
  - トークンを再生成

### Threads投稿が失敗する

- **原因**: API設定不備、アクセストークン期限切れ
- **対策**:
  - Meta for Developersでアプリ設定を確認
  - Threads APIアクセス権限を確認
  - アクセストークンを再生成

### 画像生成が失敗する

- **原因**: API キー不正、クレジット不足
- **対策**:
  - Manus API キーを確認
  - クレジット残高を確認
  - プロンプトを簡略化

### Discord通知が届かない

- **原因**: Webhook URL不正、権限不足
- **対策**:
  - Webhook URLを再生成
  - Discordサーバーの権限を確認

## 投稿時間の変更

`.github/workflows/daily-post.yml` のcron式を編集：

```yaml
schedule:
  - cron: '0 10 * * *'  # 19:00 JST (10:00 UTC)
```

例：
- 朝9時 JST: `'0 0 * * *'` (0:00 UTC)
- 昼12時 JST: `'0 3 * * *'` (3:00 UTC)
- 夜21時 JST: `'0 12 * * *'` (12:00 UTC)

## アーカイブ

生成された投稿は `archive/YYYY-MM-DD/` に保存されます：

```
archive/
└── 2026-02-14/
    ├── mocha_post.png      # 生成画像
    ├── caption.txt         # キャプション
    └── metadata.json       # メタデータ
```

## ライセンス

このシステムはモカ（Coffee Penguin）プロジェクトの一部です。

## サポート

問題が発生した場合は、GitHub Issuesで報告してください。
