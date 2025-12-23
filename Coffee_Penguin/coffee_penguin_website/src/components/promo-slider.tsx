'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const promoSlides = [
  {
    id: 1,
    image: '/images/promo-goods.png',
    alt: 'モカのグッズ販売中',
    link: '/shop'
  },
  {
    id: 2,
    image: '/images/promo-line-stickers.png',
    alt: 'LINEスタンプ好評発売中',
    link: 'https://store.line.me/stickershop/product/YOUR_STICKER_ID'
  },
  {
    id: 3,
    image: '/images/promo-new-arrival.png',
    alt: '新商品登場!',
    link: '/shop'
  }
]

export function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length)
    }, 5000) // 5秒ごとに自動スライド

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length)
  }

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full aspect-video overflow-hidden rounded-[20px] shadow-[0_8px_24px_rgba(45,24,16,0.25)]">
          {/* スライド画像 */}
          {promoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <a href={slide.link} target={slide.link.startsWith('http') ? '_blank' : '_self'} rel={slide.link.startsWith('http') ? 'noopener noreferrer' : ''}>
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover rounded-[20px]"
                  priority={index === 0}
                  sizes="100vw"
                />
              </a>
            </div>
          ))}

          {/* 前へボタン */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-coffee-dark rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="前のスライド"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 次へボタン */}
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-coffee-dark rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="次のスライド"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* インジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {promoSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-coffee-dark w-6 sm:w-8'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`スライド ${index + 1} へ移動`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
