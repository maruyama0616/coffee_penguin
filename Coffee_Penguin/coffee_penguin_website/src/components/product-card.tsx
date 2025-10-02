/* eslint-disable @next/next/no-img-element */
"use client"

export interface ProductCardProduct {
  id: number
  title: string
  imageUrl: string
  sampleImageUrl: string
  sampleUrl: string
  price: number
  discountedPrice: number | null
  itemName: string
}

interface ProductCardProps {
  product: ProductCardProduct
  isNew?: boolean
}

function formatPrice(price: number) {
  return price.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
}

export function ProductCard({ product, isNew }: ProductCardProps) {
  const hasDiscount = product.discountedPrice !== null && product.discountedPrice < product.price
  const displayImage = product.sampleImageUrl || product.imageUrl

  return (
    <div className="group relative card">
      {isNew ? (
        <span
          className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
          style={{ background: 'var(--coffee-brown)' }}
        >
          NEW
        </span>
      ) : null}

      <a href={product.sampleUrl} target="_blank" rel="noreferrer">
        <div className="aspect-square w-full overflow-hidden" style={{ background: 'var(--vintage-beige)' }}>
          <img
            src={displayImage}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-[24px]"
            loading="lazy"
          />
        </div>
      </a>

      <div className="p-4">
        <div className="mb-1 text-sm" style={{ color: 'var(--warm-gray)' }}>{product.itemName}</div>
        <h3 className="line-clamp-2 text-base font-semibold" style={{ color: 'var(--coffee-black)' }}>{product.title}</h3>

        <div className="mt-3 flex items-end gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold" style={{ color: 'var(--copper-accent)' }}>
                {formatPrice(product.discountedPrice ?? product.price)}
              </span>
              <span className="text-sm line-through" style={{ color: 'var(--warm-gray)' }}>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold" style={{ color: 'var(--coffee-black)' }}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}