/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { ExternalLink, Heart } from "lucide-react"
import { SectionHeader } from "@/components/common/section-header"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_SUZURI_USERNAME,
  normalizeSuzuriProduct,
  suzuriClient,
} from "@/lib/suzuri"

const FEATURED_LIMIT = 4

type FeaturedSource = "popular" | "newest" | "none"

type NormalizedProduct = ReturnType<typeof normalizeSuzuriProduct>

function formatPrice(price: number) {
  return price.toLocaleString("ja-JP", { style: "currency", currency: "JPY" })
}

function filterByUsername(products: NormalizedProduct[]) {
  if (!DEFAULT_SUZURI_USERNAME) {
    return products
  }

  const username = DEFAULT_SUZURI_USERNAME.toLowerCase()
  return products.filter((product) => product.url.toLowerCase().includes(username))
}

async function fetchFeaturedProducts() {
  let products: NormalizedProduct[] = []
  let source: FeaturedSource = "none"

  try {
    const response = await suzuriClient.getPopularProducts({
      limit: FEATURED_LIMIT,
      userName: DEFAULT_SUZURI_USERNAME,
    })

    const popular = filterByUsername(response.products.map(normalizeSuzuriProduct)).slice(0, FEATURED_LIMIT)

    if (popular.length > 0) {
      products = popular
      source = "popular"
    }
  } catch (error) {
    console.error("Failed to load popular Suzuri products:", error)
  }

  if (products.length === 0) {
    try {
      const response = await suzuriClient.getProducts({
        limit: FEATURED_LIMIT,
        userName: DEFAULT_SUZURI_USERNAME,
      })

      const newest = filterByUsername(response.products.map(normalizeSuzuriProduct)).slice(0, FEATURED_LIMIT)

      if (newest.length > 0) {
        products = newest
        source = "newest"
      }
    } catch (error) {
      console.error("Failed to load latest Suzuri products:", error)
    }
  }

  return { products, source }
}

export async function FeaturedProducts() {
  const { products, source } = await fetchFeaturedProducts()
  const hasProducts = products.length > 0
  const headingText = source === "newest" ? "最新のグッズ" : "人気のグッズ"
  const descriptionText =
    source === "newest"
      ? "Suzuriのショップに追加されたばかりのアイテムをピックアップしました。"
      : "Suzuriのショップで評判のアイテムをピックアップしました。"
  const badgeLabel = source === "newest" ? "新着" : "人気"

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={headingText} description={descriptionText} />

        {hasProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => {
              const displayImage = product.sampleImageUrl || product.imageUrl

              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {badgeLabel} {index + 1}
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
                      src={displayImage}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={product.sampleUrl}
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
                        href={product.sampleUrl}
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
            <p className="text-lg text-amber-700">
              Suzuriの人気・新着アイテムを取得できませんでした。時間を置いて再度アクセスしてみてください。
            </p>
          </div>
        )}

        <div className="text-center">
          <Link href="/shop">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              ほかのグッズを見る
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
