// Suzuri API client helpers

interface SuzuriMeta {
  hasNext?: boolean
  totalCount?: number
}

export interface SuzuriProduct {
  id: number
  title: string
  imageUrl: string
  sampleImageUrl: string
  sampleUrl: string
  url?: string
  priceWithTax: number
  discountedPriceWithTax?: number | null
  item?: {
    id: number
    name: string
    humanizeName?: string
  }
}

export interface SuzuriApiResponse {
  products: SuzuriProduct[]
  meta?: SuzuriMeta
}

export interface NormalizedSuzuriProduct {
  id: number
  title: string
  imageUrl: string
  sampleImageUrl: string
  sampleUrl: string
  price: number
  discountedPrice: number | null
  itemName: string
  url: string
}

interface GetProductsParams {
  limit?: number
  offset?: number
  userName?: string
}

export const DEFAULT_SUZURI_USERNAME = process.env.SUZURI_SHOP_USERNAME || 'coffee_penguin_moka'

export function normalizeSuzuriProduct(product: SuzuriProduct): NormalizedSuzuriProduct {
  const image = product.sampleImageUrl || product.imageUrl
  const sampleUrl = product.sampleUrl || product.url || image

  return {
    id: product.id,
    title: product.title,
    imageUrl: image,
    sampleImageUrl: image,
    sampleUrl,
    price: product.priceWithTax,
    discountedPrice: product.discountedPriceWithTax ?? null,
    itemName: product.item?.humanizeName || product.item?.name || 'Item',
    url: product.url || sampleUrl,
  }
}

export class SuzuriApiClient {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.SUZURI_API_KEY || ''
    this.baseUrl = process.env.SUZURI_API_BASE_URL || 'https://suzuri.jp/api/v1'
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`

    if (!this.apiKey) {
      throw new Error('Suzuri API key is not configured')
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Suzuri API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getProducts({ limit = 20, offset = 0, userName }: GetProductsParams = {}): Promise<SuzuriApiResponse> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })

      if (userName) {
        params.append('userName', userName)
      }

      const response = await this.fetchWithAuth(`/products?${params.toString()}`)
      return response
    } catch (error) {
      console.error('Failed to fetch Suzuri products:', error)
      throw error
    }
  }

  async getPopularProducts({ limit = 20, offset = 0, userName }: GetProductsParams = {}): Promise<SuzuriApiResponse> {
    try {
      // For popular products, use the regular products endpoint with userName filter
      // /products/on_sale doesn't properly filter by userName
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })

      if (userName) {
        params.append('userName', userName)
      }

      const response = await this.fetchWithAuth(`/products?${params.toString()}`)
      return response
    } catch (error) {
      console.error('Failed to fetch popular Suzuri products:', error)
      throw error
    }
  }

  async getProduct(productId: number): Promise<SuzuriProduct> {
    try {
      const response = await this.fetchWithAuth(`/products/${productId}`)
      return response.product
    } catch (error) {
      console.error(`Failed to fetch Suzuri product ${productId}:`, error)
      throw error
    }
  }
}

export const suzuriClient = new SuzuriApiClient()