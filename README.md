# ☕🐧 Mocha the Coffee Penguin

**モカ** - コーヒーを愛する皇帝ペンギンの赤ちゃん

Mochaは、Chemexコーヒープレスと皇帝ペンギンを組み合わせたキャラクターIPです。日々の癒しと心の健康をテーマに、Instagram、X (Twitter)、Threadsなどで活動しています。

---

## 🎨 キャラクター

### モカ (Mocha)
- **種族**: 皇帝ペンギンの赤ちゃん × Chemexコーヒープレス
- **性格**: 元気で好奇心旺盛、コーヒーが大好き
- **テーマ**: 癒し、メンタルヘルス、コーヒー文化
- **ターゲット**: 20-34歳の女性（クォーターライフクライシス、メンタルヘルス課題）

### ルナ (Luna)
- **種族**: 皇帝ペンギンのヒナ × Bialettiエスプレッソメーカー
- **関係**: モカの友達
- **性格**: 好奇心旺盛で元気いっぱい

---

## 🤖 自動投稿システム

### システム概要

**N8Nワークフロー自動化**により、毎日19:00 JST（日本時間）に以下を実行：

1. **日付テーマ判定**: 今日の日付から最適なテーマを自動判定（バレンタイン、季節イベント、曜日テーマなど）
2. **AI画像生成**: Manus Antigravity API（Nanobanan Pro）でキャラクター参照を使用した高品質な画像を生成
3. **画像ホスティング**: Cloudinaryに自動アップロード
4. **キャプション生成**: OpenAI GPT-4.1 Miniでモカらしいキャプションと5つのハッシュタグを生成
5. **Instagram投稿**: Instagram Graph APIで自動投稿
6. **Discord通知**: 投稿完了を通知

### アーキテクチャ

```
GitHub Actions (毎日19:00 JST)
  ↓
画像生成 (Manus Antigravity API)
  ↓
Cloudinaryアップロード
  ↓
N8N Webhookトリガー
  ↓
N8N Workflow
  ↓
OpenAIキャプション生成
  ↓
Instagram Graph API投稿
  ↓
Discord通知
```

詳細は[N8Nセットアップガイド](automation/N8N_SETUP_GUIDE.md)を参照してください。

---

## 📁 プロジェクト構成

```
coffee_penguin/
├── automation/              # 自動投稿システム
│   ├── BlendReference.png   # モカのキャラクター参照画像
│   ├── LunaReference.png    # ルナのキャラクター参照画像
│   ├── config.py            # 設定ファイル
│   ├── date_theme.py        # 日付テーマ判定モジュール
│   ├── image_generator.py   # 画像生成モジュール
│   ├── caption_generator.py # キャプション生成モジュール
│   ├── generate_and_upload.py # 画像生成とCloudinaryアップロード
│   ├── trigger_n8n.py       # N8N Webhookトリガー
│   ├── n8n_workflow.json    # N8Nワークフロー定義
│   ├── events_calendar.json # イベントカレンダー（20+イベント）
│   ├── requirements.txt     # Python依存パッケージ
│   ├── N8N_SETUP_GUIDE.md   # N8Nセットアップガイド
│   └── archive/             # 生成画像アーカイブ
├── .github/
│   └── workflows/
│       └── daily-post-n8n.yml # GitHub Actionsワークフロー（N8N連携）
└── README.md                # このファイル
```

---

## 🚀 セットアップ

### 前提条件

- **N8Nアカウント** (Cloud or Self-hosted)
- **Cloudinaryアカウント** (無料プラン可)
- **Instagram Business/Creatorアカウント** (Facebookページに接続)
- **Facebook Developer App** (Instagram Graph API用)
- **Manus APIキー**
- **OpenAI APIキー**
- **Discord Webhook URL** (オプション)

### インストール手順

詳細な手順は[N8Nセットアップガイド](automation/N8N_SETUP_GUIDE.md)を参照してください。

#### 1. リポジトリをクローン

```bash
git clone https://github.com/maruyama0616/coffee_penguin.git
cd coffee_penguin/automation
```

#### 2. Python依存パッケージをインストール

```bash
pip install -r requirements.txt
```

#### 3. N8Nワークフローをインポート

1. N8Nダッシュボードで「Add workflow」をクリック
2. 「Import from File」を選択
3. `automation/n8n_workflow.json` をアップロード

#### 4. 認証情報を設定

**GitHub Secrets**:
- `MANUS_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `N8N_WEBHOOK_URL`
- `DISCORD_WEBHOOK_URL` (オプション)

**N8N Credentials**:
- OpenAI API (HTTP Header Auth)
- Facebook Graph API (Instagram)
- Discord Webhook (オプション)

#### 5. テスト実行

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

---

## 📅 イベントカレンダー

システムは20以上の特別イベントに対応：

| 日付 | イベント | テーマ |
|------|---------|--------|
| 01-01 | 元日 | 新年の始まり |
| 02-03 | 節分 | 鬼退治と福豆 |
| 02-14 | バレンタインデー | チョコレートとコーヒー |
| 03-03 | ひな祭り | 桃の節句 |
| 03-14 | ホワイトデー | お返しの日 |
| 04-01 | エイプリルフール | いたずら |
| 06-01 | モカの誕生日 | 特別な日 |
| 07-07 | 七夕 | 願い事 |
| 10-31 | ハロウィン | かぼちゃとコスチューム |
| 12-24 | クリスマスイブ | 聖なる夜 |
| 12-25 | クリスマス | プレゼントとツリー |
| 12-31 | 大晦日 | 一年の終わり |

その他、季節テーマ（春夏秋冬）と曜日テーマも自動適用。

---

## 🎯 投稿戦略

### 最適投稿時間

**19:00 JST (日本時間)**

- Buffer社の960万投稿分析に基づく
- ターゲット層（20-34歳女性）が最もアクティブな時間帯
- 仕事終わりのリラックスタイム

### コンテンツテーマ

1. **癒し**: ストレス解消、リラックス
2. **メンタルヘルス**: 自己肯定感、マインドフルネス
3. **コーヒー文化**: コーヒーの楽しみ方、豆知識
4. **季節イベント**: バレンタイン、クリスマスなど
5. **日常の小さな幸せ**: 朝のコーヒー、週末の楽しみ

### ハッシュタグ戦略

各投稿に5つのハッシュタグを自動生成：
- 日本語ハッシュタグ（3個）: ターゲット層にリーチ
- 英語ハッシュタグ（2個）: グローバル展開

例:
```
#コーヒー #癒し #メンタルヘルス #CoffeePenguin #MochaThePenguin
```

---

## 📊 技術スタック

### 自動化
- **GitHub Actions**: スケジュール実行（毎日19:00 JST）
- **N8N**: ワークフロー自動化（キャプション生成→Instagram投稿）

### AI生成
- **Manus Antigravity API**: 画像生成（Nanobanan Pro、ウォーターマークなし）
- **OpenAI GPT-4.1 Mini**: キャプション・ハッシュタグ生成

### インフラ
- **Cloudinary**: 画像ホスティング（無料プラン）
- **Instagram Graph API**: Instagram投稿
- **Discord Webhook**: 通知

### 開発
- **Python 3.11**: バックエンドスクリプト
- **JSON**: イベントカレンダー、ワークフロー定義

---

## 🔮 今後の展開

### 短期（1-3ヶ月）
- ✅ Instagram自動投稿（完了）
- 🔄 X (Twitter) 自動投稿
- 🔄 Threads自動投稿
- 🔄 エンゲージメント分析

### 中期（3-6ヶ月）
- 📹 動画生成（Manus Veo3）
- 🎬 Instagram Reels自動投稿
- 📱 TikTok自動投稿
- 🎥 YouTube Shorts自動投稿

### 長期（6-12ヶ月）
- 🤖 コメント自動返信
- 📊 A/Bテストと最適化
- 🌐 多言語対応（英語、中国語、韓国語）
- 🛍️ グッズ展開

---

## 📈 成長目標

### Instagram
- **3ヶ月**: 1,000フォロワー
- **6ヶ月**: 5,000フォロワー
- **12ヶ月**: 10,000フォロワー

### エンゲージメント
- **いいね率**: 5%以上
- **コメント率**: 1%以上
- **保存率**: 3%以上

---

## 🤝 コントリビューション

このプロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📄 ライセンス

このプロジェクトは私的利用のためのものです。キャラクターデザインおよびコンテンツの商用利用には許可が必要です。

---

## 📞 お問い合わせ

- **GitHub**: [@maruyama0616](https://github.com/maruyama0616)
- **Instagram**: [@mocha_the_coffee_penguin](https://instagram.com/mocha_the_coffee_penguin) (準備中)

---

## 🙏 謝辞

- **Manus**: AI画像・動画生成プラットフォーム
- **OpenAI**: GPT-4.1 Mini APIによるキャプション生成
- **N8N**: ワークフロー自動化プラットフォーム
- **Cloudinary**: 画像ホスティングサービス
- **Instagram**: プラットフォーム提供

---

**モカと一緒に、素敵なコーヒータイムを世界中に届けましょう！☕🐧**
