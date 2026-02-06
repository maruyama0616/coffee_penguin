# N8Nワークフロー セットアップガイド

このガイドでは、モカのInstagram自動投稿システムをN8Nで構築する手順を説明します。

## 📋 目次

1. [システム概要](#システム概要)
2. [必要な準備](#必要な準備)
3. [N8Nのセットアップ](#n8nのセットアップ)
4. [ワークフローのインポート](#ワークフローのインポート)
5. [認証情報の設定](#認証情報の設定)
6. [GitHub Actionsの設定](#github-actionsの設定)
7. [テスト実行](#テスト実行)
8. [トラブルシューティング](#トラブルシューティング)

---

## システム概要

### アーキテクチャ

```
GitHub Actions (毎日19:00 JST)
  ↓
1. 画像生成 (Manus Antigravity API)
  ↓
2. Cloudinaryにアップロード
  ↓
3. N8N Webhookをトリガー
  ↓
N8N Workflow
  ↓
4. OpenAIでキャプション生成
  ↓
5. Instagram Graph APIで投稿
  ↓
6. Discord通知
```

### データフロー

```json
{
  "image_url": "https://res.cloudinary.com/...",
  "theme": "バレンタインデー",
  "event_name": "バレンタインデー",
  "description": "チョコレートとコーヒーの組み合わせ",
  "keywords": ["バレンタイン", "チョコレート", "コーヒー"],
  "date": "2026-02-14",
  "timestamp": "2026-02-14T10:00:00+09:00"
}
```

---

## 必要な準備

### 1. N8Nアカウント

**オプション1: N8N Cloud（推奨）**
- URL: https://n8n.io/
- 無料プランで開始可能
- メンテナンス不要

**オプション2: セルフホスト**
- Docker、VPS、またはローカルマシンでホスト
- より多くのカスタマイズが可能

### 2. Cloudinaryアカウント

- URL: https://cloudinary.com/
- 無料プランで月25クレジット（約25,000画像）
- 画像ホスティング用

### 3. Instagram Business/Creatorアカウント

- Facebookページに接続されたInstagramアカウント
- Instagram Graph API使用のため必須

### 4. Facebook Developer App

- URL: https://developers.facebook.com/
- Instagram Graph API用のアクセストークン取得

### 5. Discord Webhook（オプション）

- 通知用
- Discordサーバーの設定から作成

---

## N8Nのセットアップ

### N8N Cloudの場合

1. https://n8n.io/ にアクセス
2. アカウント作成（無料プラン選択）
3. ダッシュボードにログイン

### セルフホストの場合（Docker）

```bash
# Dockerでn8nを起動
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# ブラウザで http://localhost:5678 にアクセス
```

---

## ワークフローのインポート

### 1. ワークフローJSONをコピー

`automation/n8n_workflow.json` ファイルの内容をコピーします。

### 2. N8Nにインポート

1. N8Nダッシュボードで「Add workflow」をクリック
2. 右上のメニュー（⋮）→「Import from File」を選択
3. `n8n_workflow.json` をアップロード、または内容を貼り付け
4. 「Import」をクリック

### 3. ワークフローの確認

以下のノードが表示されることを確認：

- **Webhook** - GitHub Actionsからのトリガー受信
- **OpenAI - キャプション生成** - GPT-4.1 Miniでキャプション生成
- **キャプション整形** - データ整形
- **Instagram - メディアコンテナ作成** - Instagram Graph API
- **Wait** - 60秒待機（メディア処理待ち）
- **Instagram - 公開** - 投稿実行
- **Discord通知** - 完了通知

---

## 認証情報の設定

### 1. OpenAI API

1. **Webhookノード**以外の最初のHTTPリクエストノード（OpenAI）を選択
2. 「Credentials」→「Create New」
3. 以下を入力：
   - **Credential Type**: HTTP Header Auth
   - **Name**: `Authorization`
   - **Value**: `Bearer YOUR_OPENAI_API_KEY`

**OpenAI APIキーの取得方法:**
- https://platform.openai.com/api-keys
- 「Create new secret key」でキー生成

### 2. Instagram Graph API

#### ステップ1: Facebook Developer Appを作成

1. https://developers.facebook.com/ にアクセス
2. 「My Apps」→「Create App」
3. App Type: **Business**
4. App Name: `Mocha Instagram Automation`
5. App作成後、「Add Product」→「Instagram」を追加

#### ステップ2: Instagram Business Accountを接続

1. Facebookページを作成（まだない場合）
2. InstagramアカウントをFacebookページに接続
3. Facebook Developer App設定で「Instagram Basic Display」を設定

#### ステップ3: アクセストークンを取得

1. Graph API Explorerを使用: https://developers.facebook.com/tools/explorer/
2. Permissions: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`
3. 「Generate Access Token」をクリック
4. **Long-lived Token**に変換（60日間有効）:

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

#### ステップ4: Instagram Account IDを取得

```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_ACCESS_TOKEN"
```

レスポンスから`instagram_business_account.id`を取得。

#### ステップ5: N8Nに認証情報を設定

1. **Instagram - メディアコンテナ作成**ノードを選択
2. 「Credentials」→「Create New」→「Facebook Graph API」
3. 以下を入力：
   - **Access Token**: 上記で取得したLong-lived Token
   - **Instagram Account ID**: 上記で取得したAccount ID

### 3. Discord Webhook（オプション）

1. Discordサーバー設定→「連携サービス」→「ウェブフック」
2. 「新しいウェブフック」を作成
3. Webhook URLをコピー
4. N8Nの**Discord通知**ノードで設定：
   - Credential Type: `discordWebhook`
   - Webhook URL: コピーしたURL

---

## GitHub Actionsの設定

### 1. Cloudinary認証情報を取得

1. https://cloudinary.com/ にログイン
2. Dashboard→「Account Details」
3. 以下をコピー：
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. N8N Webhook URLを取得

1. N8Nワークフローの**Webhookノード**を選択
2. 「Test URL」または「Production URL」をコピー
   - 例: `https://your-n8n-instance.app.n8n.cloud/webhook/mocha-instagram`

### 3. GitHub Secretsを設定

リポジトリの「Settings」→「Secrets and variables」→「Actions」→「New repository secret」

以下のSecretsを追加：

| Secret名 | 説明 | 取得方法 |
|---------|------|---------|
| `MANUS_API_KEY` | Manus API Key | Manusダッシュボード |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | Cloudinary Dashboard |
| `N8N_WEBHOOK_URL` | N8N Webhook URL | N8N Webhookノード |
| `DISCORD_WEBHOOK_URL` | Discord Webhook URL（オプション） | Discord設定 |

### 4. ワークフローを有効化

1. `.github/workflows/daily-post-n8n.yml` をリポジトリにコミット
2. GitHub Actions タブで「モカ自動投稿 (N8N連携)」が表示されることを確認
3. 必要に応じて古い`daily-post.yml`を無効化または削除

---

## テスト実行

### 1. 手動トリガーでテスト

#### GitHub Actionsから

1. GitHubリポジトリの「Actions」タブ
2. 「モカ自動投稿 (N8N連携)」を選択
3. 「Run workflow」→「Run workflow」をクリック

#### ローカルから

```bash
cd automation

# 環境変数を設定
export MANUS_API_KEY="your_key"
export CLOUDINARY_CLOUD_NAME="your_cloud_name"
export CLOUDINARY_API_KEY="your_api_key"
export CLOUDINARY_API_SECRET="your_api_secret"
export N8N_WEBHOOK_URL="your_webhook_url"

# 画像生成とアップロード
python generate_and_upload.py

# N8N Webhookをトリガー
python trigger_n8n.py
```

### 2. N8Nワークフローの実行確認

1. N8Nダッシュボードで「Executions」タブを確認
2. 最新の実行が成功（緑色）になっていることを確認
3. 各ノードをクリックして出力データを確認

### 3. Instagram投稿を確認

1. Instagramアプリまたはブラウザでアカウントにアクセス
2. 最新の投稿が表示されることを確認
3. キャプションとハッシュタグが正しいことを確認

### 4. Discord通知を確認（設定している場合）

Discordチャンネルに投稿完了通知が届くことを確認。

---

## トラブルシューティング

### 問題1: 画像生成に失敗する

**症状**: `generate_and_upload.py`でエラー

**解決策**:
- `MANUS_API_KEY`が正しく設定されているか確認
- `automation/BlendReference.png`が存在するか確認
- `image_generator.py`のログを確認

### 問題2: Cloudinaryアップロードに失敗する

**症状**: `❌ Cloudinaryアップロードエラー`

**解決策**:
- Cloudinary認証情報が正しいか確認
- Cloudinaryの無料プラン制限（月25クレジット）を超えていないか確認
- インターネット接続を確認

### 問題3: N8N Webhookがトリガーされない

**症状**: N8Nで実行が記録されない

**解決策**:
- Webhook URLが正しいか確認（Production URLを使用）
- N8Nワークフローが「Active」になっているか確認
- `trigger_n8n.py`のログでHTTPステータスコードを確認

### 問題4: Instagram投稿に失敗する

**症状**: `Instagram - 公開`ノードでエラー

**解決策**:

#### エラー: "Invalid OAuth access token"
- アクセストークンが期限切れの可能性
- Long-lived Tokenを再生成（60日ごとに必要）

#### エラー: "Image URL is not accessible"
- Cloudinaryの画像URLが公開されているか確認
- URLが正しくN8Nに渡されているか確認

#### エラー: "Instagram account is not a Business account"
- InstagramアカウントがBusiness/Creatorアカウントに変換されているか確認
- Facebookページに接続されているか確認

### 問題5: キャプション生成に失敗する

**症状**: OpenAIノードでエラー

**解決策**:
- OpenAI APIキーが正しいか確認
- OpenAIアカウントにクレジットが残っているか確認
- リクエストレート制限に達していないか確認

### 問題6: Wait時間が足りない

**症状**: Instagram公開時に「Media not ready」エラー

**解決策**:
- **Waitノード**の待機時間を60秒→120秒に増やす
- 画像サイズが大きい場合は処理に時間がかかる

---

## 定期実行の確認

### スケジュール

- **実行時刻**: 毎日19:00 JST（10:00 UTC）
- **GitHub Actions**: `.github/workflows/daily-post-n8n.yml`のcron設定

### 実行履歴の確認

1. **GitHub Actions**:
   - リポジトリの「Actions」タブ
   - 過去の実行履歴とログを確認

2. **N8N**:
   - 「Executions」タブ
   - 各ノードの入出力データを確認

3. **Instagram**:
   - 投稿が毎日19:00頃に公開されているか確認

---

## 次のステップ

### 1. 動画投稿への拡張

- Manus Veo3 APIで動画生成
- Instagram Reels対応
- TikTok、YouTube Shortsへの展開

### 2. X (Twitter) / Threads対応

- N8Nワークフローに追加ノードを作成
- 同時投稿機能の実装

### 3. A/Bテストと分析

- 複数のキャプションパターンを生成
- エンゲージメント分析
- 最適な投稿時間の自動調整

### 4. ユーザーインタラクション

- コメント自動返信
- DMへの自動応答
- フォロワー分析

---

## サポート

問題が解決しない場合:

1. **GitHub Issues**: https://github.com/maruyama0616/coffee_penguin/issues
2. **N8N Community**: https://community.n8n.io/
3. **Instagram API Docs**: https://developers.facebook.com/docs/instagram-api/

---

## まとめ

このガイドに従うことで、モカのInstagram投稿を完全自動化できます。

**システムの利点**:
- ✅ 完全自動化（毎日19:00 JSTに投稿）
- ✅ AI生成画像（Manus Antigravity）
- ✅ AI生成キャプション（OpenAI GPT-4.1 Mini）
- ✅ 日付ベースのテーマ自動判定
- ✅ Discord通知
- ✅ アーカイブ機能

**今後の展開**:
- 🎥 動画投稿（Reels、TikTok、YouTube Shorts）
- 🐦 X (Twitter) / Threads同時投稿
- 📊 エンゲージメント分析
- 🤖 コメント自動返信

モカと一緒に、素敵なコーヒータイムを世界中に届けましょう！☕🐧
