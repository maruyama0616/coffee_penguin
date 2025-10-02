# Coffee Penguin - モカの公式サイト

コーヒーペンギンのモカの公式Webサイトです。癒し・共感・成長支援を提供するキャラクターサイトとして、SNS誘導とSuzuri商品販売促進を目的としています。

## 🌟 特徴

- **レスポンシブデザイン**: スマホファーストで全デバイス対応
- **Suzuri連携**: API経由での商品情報取得・表示
- **モダンな技術スタック**: Next.js 15 + TypeScript + Tailwind CSS
- **データベース連携**: Prisma + PostgreSQL
- **SEO最適化**: メタタグ・OGP設定済み

## 🚀 技術スタック

### フロントエンド
- **Next.js 15**: App Router使用
- **TypeScript**: 型安全性確保
- **Tailwind CSS 4**: スタイリング
- **Zustand**: 状態管理
- **Lucide React**: アイコン

### バックエンド・データベース
- **Prisma**: ORM
- **PostgreSQL**: メインデータベース
- **Next.js API Routes**: バックエンド処理

### 外部サービス連携
- **Suzuri API**: 商品データ取得・同期
- **Cloudinary**: 画像管理・最適化（予定）
- **Resend**: メール送信（予定）

## 📁 プロジェクト構成

```
coffee_penguin_website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # Aboutページ
│   │   ├── shop/              # Shopページ
│   │   ├── gallery/           # Galleryページ
│   │   ├── news/              # Newsページ
│   │   ├── contact/           # Contactページ
│   │   └── api/               # API Routes
│   │       ├── suzuri/        # Suzuri連携API
│   │       └── contact/       # お問い合わせAPI
│   ├── components/            # Reactコンポーネント
│   │   ├── ui/                # 基本UIコンポーネント
│   │   ├── navigation.tsx     # ナビゲーション
│   │   ├── footer.tsx         # フッター
│   │   ├── hero-section.tsx   # ヒーローセクション
│   │   ├── product-card.tsx   # 商品カード
│   │   └── ...               # その他のコンポーネント
│   └── lib/                   # ユーティリティ・ライブラリ
│       ├── prisma.ts          # Prismaクライアント
│       ├── suzuri.ts          # Suzuri API連携
│       └── utils.ts           # 共通ユーティリティ
├── prisma/
│   └── schema.prisma          # データベーススキーマ
└── public/                    # 静的ファイル
```

## 🛠️ セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd coffee_penguin_website
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/coffee_penguin?schema=public"

# Suzuri API
SUZURI_API_KEY="your_suzuri_api_key_here"
SUZURI_API_BASE_URL="https://suzuri.jp/api/v1"

# NextAuth.js
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (画像管理)
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Resend (メール送信)
RESEND_API_KEY="your_resend_api_key_here"

# Contact notifications
CONTACT_TO_EMAIL="coffeepenguin@maruyama.net"
CONTACT_FROM_EMAIL="Coffee Penguin <no-reply@coffee-penguin.com>"

```

### 4. データベースのセットアップ

```bash
# Prismaクライアントの生成
npx prisma generate

# データベースマイグレーション
npx prisma migrate dev

# データベースの確認（オプション）
npx prisma studio
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてサイトを確認してください。

## 📱 ページ構成

### 実装済みページ
- **トップページ** (`/`): メインビジュアル、キャッチコピー、SNS誘導、人気商品紹介
- **Aboutページ** (`/about`): キャラクタープロフィール、魅力紹介
- **Shopページ** (`/shop`): Suzuri商品一覧・詳細表示
- **Galleryページ** (`/gallery`): 静的画像ギャラリー
- **Newsページ** (`/news`): 手動更新による最新情報
- **Contactページ** (`/contact`): 基本問い合わせフォーム

### API エンドポイント
- `GET /api/suzuri/products`: 商品一覧取得
- `GET /api/suzuri/products/[id]`: 個別商品取得
- `POST /api/suzuri/sync`: 商品同期（管理者用）
- `POST /api/contact`: お問い合わせ送信
- `GET /api/contact`: お問い合わせ一覧（管理者用）

## 🎨 デザインシステム

### カラーパレット
- **プライマリー**: アンバー（#d97706）- コーヒーをイメージ
- **セカンダリー**: ライトアンバー（#fef3c7）
- **アクセント**: ゴールド（#fbbf24）
- **テキスト**: グレー系（#171717, #6b7280）

### フォント
- **メイン**: Geist Sans（システムフォントフォールバック付き）
- **コード**: Geist Mono

## 📊 データベース設計

### 主要テーブル
- `News`: ニュース記事
- `GalleryImage`: ギャラリー画像
- `Contact`: お問い合わせ
- `SuzuriProduct`: Suzuri商品情報
- `SuzuriSyncLog`: 商品同期ログ
- `SiteConfig`: サイト設定

## 🚀 デプロイ

### Vercel（推奨）
1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. データベース（Supabase推奨）を設定
4. デプロイ実行

### その他のプラットフォーム
- Netlify
- AWS Amplify
- Railway

## 📈 今後の予定

### Phase 2（1ヶ月以内）
- [ ] Google Analytics導入
- [ ] 画像最適化（Cloudinary連携）
- [ ] 表示速度改善
- [ ] SEO基本対策完了

### Phase 3（3ヶ月以内）
- [ ] 商品検索機能
- [ ] カテゴリフィルター
- [ ] お気に入り機能
- [ ] 自動同期スケジュール
- [ ] 管理画面

### Phase 4（6ヶ月以内）
- [ ] 多言語対応（英語・韓国語）
- [ ] 会員機能
- [ ] SNS API連携
- [ ] 高度なショップ機能

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 📞 サポート

質問やサポートが必要な場合は、以下までお問い合わせください：
- Email: support@coffee-penguin.com
- GitHub Issues: [プロジェクトのIssuesページ](https://github.com/your-username/coffee-penguin-website/issues)

---

**Coffee Penguin** - モカと一緒に、特別な時間を 🐧☕
