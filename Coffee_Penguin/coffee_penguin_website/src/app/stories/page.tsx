import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Web漫画 | Mocha the Coffee Penguin',
  description: 'Mochaの日常を描いたWeb漫画。言葉少なめで、感情や仕草で語るストーリー。',
}

// 仮のデータ（後でmicroCMSやデータベースから取得）
const stories = [
  {
    id: 1,
    title: '朝のコーヒー',
    slug: 'morning-coffee',
    thumbnail: '/images/mocha-hero.png',
    publishedAt: '2025-01-15',
    theme: '日常',
    description: '今日も一日が始まる。',
  },
  {
    id: 2,
    title: '雨の日',
    slug: 'rainy-day',
    thumbnail: '/images/mocha-sitting.png',
    publishedAt: '2025-01-12',
    theme: '内省',
    description: '窓の外を眺めながら。',
  },
  {
    id: 3,
    title: 'ちいさな成長',
    slug: 'small-growth',
    thumbnail: '/images/mocha-waving.png',
    publishedAt: '2025-01-10',
    theme: '成長',
    description: '少しずつ、前に進む。',
  },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-mocha-cream">
      {/* ヘッダーセクション */}
      <section className="section-mocha bg-mocha-steel-light">
        <div className="container-mocha text-center">
          <h1 className="text-hero mb-4">Mochaの物語</h1>
          <p className="text-body max-w-2xl mx-auto text-text-secondary">
            言葉少なめで、感情や仕草で語るWeb漫画。
            <br />
            Mochaと一緒に、日常の小さな発見や心の動きを感じてみませんか。
          </p>
        </div>
      </section>

      {/* 漫画一覧セクション */}
      <section className="section-mocha">
        <div className="container-mocha">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="card-mocha group"
              >
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="px-3 py-1 bg-warm-beige rounded-full text-coffee-medium">
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
                  <h3 className="text-2xl font-handwriting text-coffee-dark group-hover:text-coffee-medium transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-text-secondary">{story.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="section-mocha bg-mocha-white">
        <div className="container-mocha text-center">
          <h2 className="text-3xl font-handwriting text-coffee-dark mb-4">
            もっとMochaを知りたい方へ
          </h2>
          <p className="text-body text-text-secondary mb-8 max-w-xl mx-auto">
            SNSでは、ここでは語られないMochaの日常や、
            <br />
            ファンの皆さんとの交流を楽しんでいます。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://twitter.com/_CoffeePenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mocha btn-mocha-primary"
            >
              Xをフォロー
            </a>
            <a
              href="https://instagram.com/coffee_penguin_moka"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mocha btn-mocha-secondary"
            >
              Instagramをフォロー
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
