'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// 仮のストーリーデータ（後でCMSから取得）
const stories = [
  {
    id: 1,
    title: '朝のコーヒー',
    slug: 'morning-coffee',
    description: '今日も一日が始まる。静かな朝に、一杯のコーヒーを。',
    thumbnail: '/images/mocha-sitting.png',
    date: '2025-01-15',
    emotion: '静けさ'
  },
  {
    id: 2,
    title: '雨の日',
    slug: 'rainy-day',
    description: '雨音を聞きながら、窓辺で過ごす午後。',
    thumbnail: '/images/mocha-profile.png',
    date: '2025-01-12',
    emotion: '内省'
  },
  {
    id: 3,
    title: '小さな勇気',
    slug: 'small-courage',
    description: '一歩踏み出すことの、大切さ。',
    thumbnail: '/images/mocha-waving.png',
    date: '2025-01-10',
    emotion: '成長'
  }
]

export function FeaturedStories() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* セクションヘッダー */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-steel-blue-light/50 rounded-full px-4 py-2 mb-4">
          <span className="text-sm font-medium text-coffee-dark tracking-wide">Stories</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-light text-coffee-dark mb-4">
          モカの物語
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          言葉少なめに、感情を綴る。<br />
          モカと一緒に、心の旅へ。
        </p>
      </div>

      {/* ストーリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.slug}`}
            className="group"
            onMouseEnter={() => setHoveredId(story.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <article className="bg-white rounded-3xl overflow-hidden border border-coffee-light/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              {/* サムネイル */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-cream to-steel-blue-light overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`transition-transform duration-500 ${hoveredId === story.id ? 'scale-110' : 'scale-100'}`}>
                    <Image
                      src={story.thumbnail}
                      alt={story.title}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* 感情タグ */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5">
                  <span className="text-xs font-medium text-coffee-medium">{story.emotion}</span>
                </div>
              </div>

              {/* コンテンツ */}
              <div className="p-6">
                <time className="text-xs text-text-muted tracking-wider uppercase mb-2 block">
                  {new Date(story.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h3 className="text-2xl font-medium text-coffee-dark mb-3 group-hover:text-coffee-medium transition-colors">
                  {story.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {story.description}
                </p>
              </div>

              {/* ホバー時の装飾線 */}
              <div className={`h-1 bg-gradient-to-r from-coffee-medium to-steel-blue transition-all duration-500 ${hoveredId === story.id ? 'w-full' : 'w-0'}`}></div>
            </article>
          </Link>
        ))}
      </div>

      {/* すべての物語を見るボタン */}
      <div className="text-center">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-dark text-white rounded-full font-medium hover:bg-coffee-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          すべての物語を見る
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
