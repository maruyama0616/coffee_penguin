import { PromoSlider } from '@/components/promo-slider'
import { SocialIcons } from '@/components/social-icons'
import { MokaProfile } from '@/components/moka-profile'
import { FeaturedProducts } from '@/components/featured-products'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 広告スライダー - ヘッダー直下に配置 */}
      <PromoSlider />

      {/* SNSアイコンリンク */}
      <SocialIcons />

      {/* モカの紹介セクション */}
      <section data-moka-section="about" className="py-24">
        <MokaProfile />
      </section>

      {/* グッズセクション - ライフスタイル提案型 */}
      <section data-moka-section="shop" className="py-24">
        <FeaturedProducts />
      </section>
    </div>
  )
}
