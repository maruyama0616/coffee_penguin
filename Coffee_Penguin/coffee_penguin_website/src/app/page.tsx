import { HeroSection } from '@/components/hero-section'
import { FeaturedProducts } from '@/components/featured-products'
import { InstagramFeed } from '@/components/instagram-feed'
import { MokaProfile } from '@/components/moka-profile'
import { LatestNews } from '@/components/latest-news'
import { SectionHeader } from '@/components/common/section-header'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section data-moka-section="hero">
        <HeroSection />
      </section>

      {/* Instagramセクション */}
      <InstagramFeed />

      {/* 人気アイテムセクション */}
      <section data-moka-section="shop">
        <FeaturedProducts />
      </section>

      {/* モカの紹介セクション */}
      <section data-moka-section="about">
        <MokaProfile />
      </section>

      {/* 最新ニュースセクション */}
      <section data-moka-section="news">
        <LatestNews />
      </section>

      {/* SNSでもっと身近にセクション */}
      <section data-moka-section="sns" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="SNSでもっと身近に"
            description="InstagramやXでも最新情報を発信中。お気に入りのチャンネルでCoffee Penguinの日常をチェックしてください。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://instagram.com/coffee_penguin_moka"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Instagram</h3>
                <p className="text-sm opacity-90">最新の写真をチェック</p>
              </div>
            </a>
            <a
              href="https://twitter.com/_CoffeePenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✕</span>
                </div>
                <h3 className="font-bold text-lg mb-2">X</h3>
                <p className="text-sm opacity-90">最新ニュースをお届け</p>
              </div>
            </a>
            <a
              href="https://youtube.com/@coffeepenguin_youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">▶</span>
                </div>
                <h3 className="font-bold text-lg mb-2">YouTube</h3>
                <p className="text-sm opacity-90">動画コンテンツも公開中</p>
              </div>
            </a>
            <a
              href="https://tiktok.com/@_coffeepenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♫</span>
                </div>
                <h3 className="font-bold text-lg mb-2">TikTok</h3>
                <p className="text-sm opacity-90">ショート動画でモカの日常</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
