import { NextRequest, NextResponse } from 'next/server'
import {
  DEFAULT_SUZURI_USERNAME,
  normalizeSuzuriProduct,
  NormalizedSuzuriProduct,
  suzuriClient,
} from '@/lib/suzuri'

const DEFAULT_PER_PAGE = 12

type ProductListItem = Omit<NormalizedSuzuriProduct, 'url'>

function toProductListItem(product: NormalizedSuzuriProduct): ProductListItem {
  return {
    id: product.id,
    title: product.title,
    imageUrl: product.imageUrl,
    sampleImageUrl: product.sampleImageUrl,
    sampleUrl: product.sampleUrl,
    price: product.price,
    discountedPrice: product.discountedPrice,
    itemName: product.itemName,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1)
    const perPage = Math.max(parseInt(searchParams.get('per_page') || DEFAULT_PER_PAGE.toString(), 10), 1)
    const offset = (page - 1) * perPage

    const response = await suzuriClient.getProducts({
      limit: perPage,
      offset,
      userName: DEFAULT_SUZURI_USERNAME,
    })

    const products = response.products.map((product) => toProductListItem(normalizeSuzuriProduct(product)))
    const hasNext = response.meta?.hasNext ?? products.length === perPage

    return NextResponse.json({
      products,
      page,
      perPage,
      hasNext,
    })
  } catch (error) {
    console.error('Failed to fetch products from Suzuri:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products from Suzuri' },
      { status: 500 },
    )
  }
}