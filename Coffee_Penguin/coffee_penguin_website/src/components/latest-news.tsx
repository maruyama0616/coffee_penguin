import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

// プレースホルダーデータ - 実際のニュースデータに置き換える
const latestNews = [
  {
    id: 1,
    title: 'モカの新しいグッズがSuzuriで発売開始！',
    summary: '人気のマグカップとトートバッグの新デザインが登場しました。',
    publishedAt: new Date('2024-01-15'),
    imageUrl: '/placeholder-news-1.jpg',
    category: 'グッズ',
  },
  {
    id: 2,
    title: 'モカの日常 - コーヒーブレイクの時間',
    summary: 'モカが愛用するコーヒー豆と、おすすめの淹れ方についてご紹介します。',
    publishedAt: new Date('2024-01-10'),
    imageUrl: '/placeholder-news-2.jpg',
    category: '日常',
  },
  {
    id: 3,
    title: 'モカファンイベント開催決定！',
    summary: 'オンラインでモカと一緒にコーヒータイムを楽しむイベントを開催します。',
    publishedAt: new Date('2024-01-08'),
    imageUrl: '/placeholder-news-3.jpg',
    category: 'イベント',
  },
]

export function LatestNews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              最新ニュース
            </h2>
            <p className="text-xl text-gray-600">
              モカの最新情報やお知らせをお届けします
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/news">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                すべてのニュースを見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ニュースグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* 画像 */}
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <span className="text-3xl">📰</span>
                    </div>
                    <p className="text-xs text-gray-600">ニュース画像</p>
                  </div>
                </div>
                
                {/* カテゴリバッジ */}
                <div className="absolute top-3 left-3">
                  <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* コンテンツ */}
              <div className="p-6">
                {/* 日付 */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={news.publishedAt.toISOString()}>
                    {news.publishedAt.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                {/* タイトル */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  <Link href={`/news/${news.id}`}>
                    {news.title}
                  </Link>
                </h3>

                {/* サマリー */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {news.summary}
                </p>

                {/* 続きを読むリンク */}
                <Link
                  href={`/news/${news.id}`}
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                >
                  続きを読む
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* モバイル用のニュース一覧ボタン */}
        <div className="md:hidden text-center mt-8">
          <Link href="/news">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              すべてのニュースを見る
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

