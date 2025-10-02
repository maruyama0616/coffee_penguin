"use client"

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw } from 'lucide-react'

interface Product {
  id: number
  title: string
  imageUrl: string
  sampleImageUrl: string
  sampleUrl: string
  price: number
  discountedPrice: number | null
  itemName: string
}

interface ProductsResponse {
  products: Product[]
  page: number
  perPage: number
  hasNext: boolean
}

const PER_PAGE = 12

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const fetchProducts = async (pageNum: number = 1) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/suzuri/products?page=${pageNum}&per_page=${PER_PAGE}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data: ProductsResponse = await response.json()
      setProducts(data.products)
      setPage(data.page)
      setHasNext(data.hasNext)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const syncProducts = async () => {
    try {
      setSyncing(true)
      await fetchProducts(1)
    } finally {
      setSyncing(false)
    }
  }

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && page > 1) {
      fetchProducts(page - 1)
    }

    if (direction === 'next' && hasNext) {
      fetchProducts(page + 1)
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [])

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-amber-600" />
          <p className="text-gray-600">商品を読み込み中です...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">商品の取得に失敗しました</p>
          <Button onClick={() => fetchProducts(1)} variant="outline">
            再試行
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">商品一覧</h2>
          <p className="text-gray-600">コーヒーペンギンのアイテムをSuzuriでチェック</p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Button
            onClick={syncProducts}
            disabled={syncing}
            variant="outline"
            className="border-amber-600 text-amber-600 hover:bg-amber-50"
          >
            {syncing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                更新中...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                一覧を更新
              </>
            )}
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-gray-400">Penguin</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">まだ商品がありません</h3>
          <p className="text-gray-600 mb-6">Suzuriで商品を公開するとこちらに表示されます</p>
          <Button onClick={syncProducts} disabled={syncing}>
            {syncing ? '更新中...' : '最新の状態を確認'}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isNew={page === 1 && index < 4}
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => handlePageChange('prev')}
              disabled={page === 1 || loading}
              variant="outline"
              size="sm"
            >
              前へ
            </Button>

            <span className="text-sm text-gray-600">ページ {page}</span>

            <Button
              onClick={() => handlePageChange('next')}
              disabled={!hasNext || loading}
              variant="outline"
              size="sm"
            >
              次へ
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

