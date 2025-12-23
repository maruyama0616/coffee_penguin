import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// 仮のデータ（後でmicroCMSやデータベースから取得）
const storiesData: Record<string, {
  title: string
  publishedAt: string
  theme: string
  description: string
  panels: string[]
}> = {
  'morning-coffee': {
    title: '朝のコーヒー',
    publishedAt: '2025-01-15',
    theme: '日常',
    description: '今日も一日が始まる。静かな朝、Mochaはコーヒーを淹れる。',
    panels: [
      '/images/mocha-hero.png',
      '/images/mocha-sitting.png',
      '/images/mocha-waving.png',
    ],
  },
  'rainy-day': {
    title: '雨の日',
    publishedAt: '2025-01-12',
    theme: '内省',
    description: '窓の外を眺めながら、Mochaは何を思うのだろう。',
    panels: [
      '/images/mocha-sitting.png',
      '/images/mocha-profile.png',
    ],
  },
  'small-growth': {
    title: 'ちいさな成長',
    publishedAt: '2025-01-10',
    theme: '成長',
    description: '少しずつ、前に進む。それでいいんだ。',
    panels: [
      '/images/mocha-waving.png',
      '/images/mocha-hero.png',
    ],
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = storiesData[slug]
  
  if (!story) {
    return {
      title: 'ストーリーが見つかりません',
    }
  }

  return {
    title: `${story.title} | Mocha the Coffee Penguin`,
    description: story.description,
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params
  const story = storiesData[slug]

  if (!story) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-mocha-cream">
      {/* ヘッダー */}
      <section className="section-mocha bg-mocha-white">
        <div className="container-mocha max-w-3xl">
          <Link
            href="/stories"
            className="inline-flex items-center text-coffee-medium hover:text-coffee-dark mb-8 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            一覧に戻る
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <span className="px-4 py-1.5 bg-warm-beige rounded-full text-coffee-medium font-medium">
                {story.theme}
              </span>
              <time dateTime={story.publishedAt}>
                {new Date(story.publishedAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h1 className="text-hero">{story.title}</h1>
            <p className="text-body text-text-secondary">{story.description}</p>
          </div>
        </div>
      </section>

      {/* 漫画パネル */}
      <section className="section-mocha">
        <div className="container-mocha max-w-2xl">
          <div className="space-y-8">
            {story.panels.map((panel, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-square relative">
                  <Image
                    src={panel}
                    alt={`${story.title} - コマ ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ナビゲーション */}
      <section className="section-mocha bg-mocha-steel-light">
        <div className="container-mocha max-w-3xl text-center">
          <h2 className="text-3xl font-handwriting text-coffee-dark mb-6">
            他のストーリーも読む
          </h2>
          <Link
            href="/stories"
            className="btn-mocha btn-mocha-primary"
          >
            一覧を見る
          </Link>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(storiesData).map((slug) => ({
    slug,
  }))
}
