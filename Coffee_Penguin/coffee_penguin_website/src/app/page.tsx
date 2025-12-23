import { PromoSlider } from '@/components/promo-slider'
import { MokaProfile } from '@/components/moka-profile'
import { FeaturedProducts } from '@/components/featured-products'
import { InstagramFeed } from '@/components/instagram-feed'
import { LatestNews } from '@/components/latest-news'
import { SectionHeader } from '@/components/common/section-header'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 広告スライダー - ヘッダー直下に配置 */}
      <PromoSlider />

      {/* モカの紹介セクション */}
      <section data-moka-section="about" className="py-24" style={{ background: "var(--cream)" }}>
        <MokaProfile />
      </section>

      {/* グッズセクション - ライフスタイル提案型 */}
      <section data-moka-section="shop" className="py-24 bg-white">
        <FeaturedProducts />
      </section>

      {/* Instagramセクション - 視覚的な世界観の拡張 */}
      <section data-moka-section="instagram" className="py-24" style={{ background: "var(--cream)" }}>
        <InstagramFeed />
      </section>

      {/* 最新ニュースセクション - シンプルに */}
      <section data-moka-section="news" className="py-20 bg-white">
        <LatestNews />
      </section>

      {/* SNSセクション - 主要なSNSに絞り、控えめに */}
      <section data-moka-section="sns" className="py-20" style={{ background: "var(--steel-blue-light)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="SNSでつながる"
            description="日々の小さな物語は、XとInstagramで。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {/* X (Twitter) */}
            <a
              href="https://twitter.com/_CoffeePenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-coffee-light/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">𝕏</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-coffee-dark">X</h3>
                  <p className="text-sm text-text-secondary">@_CoffeePenguin</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                日々の気づきや、短い物語を投稿しています。
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/_coffeepenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-coffee-light/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📷</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-coffee-dark">Instagram</h3>
                  <p className="text-sm text-text-secondary">@_coffeepenguin</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                モカの日常を、写真とイラストで。
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
