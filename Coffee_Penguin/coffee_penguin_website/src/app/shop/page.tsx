import { Metadata } from 'next'
import { ProductGrid } from '@/components/product-grid'
import { SectionHeader } from '@/components/common/section-header'

export const metadata: Metadata = {
  title: 'Shop - モカのグッズ | Coffee Penguin',
  description: 'モカの公式グッズをSuzuriで販売中！マグカップ、ステッカー、トートバッグなど、モカと一緒に過ごす時間をもっと楽しくするアイテムをご紹介します。',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-4xl">🛍️</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              モカのグッズ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              モカと一緒に過ごす時間をもっと楽しくする、<br />
              厳選されたアイテムをご紹介します。<br />
              すべての商品はSuzuriで販売しています。
            </p>
          </div>
        </div>
      </section>

      {/* 商品一覧セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid />
        </div>
      </section>


      {/* LINEスタンプ・着せ替えセクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8 lg:p-12">
            <SectionHeader
              title="LINEスタンプ・着せ替え"
              description="LINE STOREで公開中のスタンプや着せ替えをチェックしてください。"
              alignment="left"
            />
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-xl overflow-hidden bg-white shadow-md">
                <iframe
                  src="https://store.line.me/stickershop/author/2380035/ja"
                  title="LINEスタンプ・着せ替え"
                  className="w-full h-[560px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed">
                  モカの表情豊かなスタンプや着せ替えテーマを、LINE STOREで配信中です。
                  カフェトークのおともに、ぜひモカのリアクションを使ってみてください。
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li>・挨拶や日常会話に使いやすい24種類のスタンプ</li>
                  <li>・季節ごとに楽しめる着せ替えテーマを順次公開</li>
                  <li>・新作情報はLINE公式アカウントでもお知らせ予定</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://store.line.me/stickershop/author/2380035/ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 hover:bg-green-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors"
                  >
                    LINEスタンプを見る
                  </a>
                  <a
                    href="https://store.line.me/themeshop/author/4326805/ja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 text-sm font-medium shadow transition-colors"
                  >
                    着せ替えを見る
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suzuri紹介セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Suzuriについて
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Suzuriは、クリエイターのオリジナルデザインを商品化できるプラットフォームです。
                  モカのグッズはすべてSuzuriで製造・販売されており、
                  高品質な商品をお届けしています。
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">高品質な印刷・製造</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">安全な決済システム</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">迅速な配送対応</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl p-8">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🏪</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Suzuriストア
                  </h3>
                  <p className="text-gray-600 mb-6">
                    モカのすべてのグッズは<br />
                    Suzuriでご購入いただけます
                  </p>
                  <a
                    href="https://suzuri.jp/CoffeePenguin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Suzuriストアへ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}







