/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { ExternalLink, Heart } from "lucide-react"
import { SectionHeader } from "@/components/common/section-header"
import { Button } from "@/components/ui/button"
import { featuredProducts, shopUrl } from "@/data/products"

function formatPrice(price: number) {
  return price.toLocaleString("ja-JP", { style: "currency", currency: "JPY" })
}

export function FeaturedProducts() {
  const products = featuredProducts
  const hasProducts = products.length > 0

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="モカのグッズ"
          description="モカと一緒に過ごす時間をもっと楽しくする、厳選されたアイテムをご紹介します。すべての商品はSuzuriで販売しています。"
        />

        {hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => {
              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      人気 {index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
                    aria-label="お気に入りに追加"
                  >
                    <Heart className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                  </button>

                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                        >
                          <span>詳しく見る</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-600">{formatPrice(product.price)}</span>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-amber-600 transition-colors flex items-center space-x-1"
                      >
                        <span>購入ページ</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-10 text-center mb-12">
            <p className="text-lg text-amber-700">商品の取得に失敗しました</p>
          </div>
        )}

        <div className="text-center">
          <a href={shopUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              ほかのグッズを見る
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
