'use client'

import { useState } from 'react'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

// プレースホルダーデータ - 実際のニュースデータに置き換える
const newsData = [
  {
    id: 1,
    title: 'モカの新しいグッズがSuzuriで発売開始！',
    summary: '人気のマグカップとトートバッグの新デザインが登場しました。今回のデザインは、モカの可愛らしさと実用性を兼ね備えた特別なアイテムです。',
    content: 'モカの新しいグッズシリーズがSuzuriで発売開始されました。今回のコレクションには、モカの日常をテーマにしたマグカップとトートバッグが含まれています。\n\nマグカップは、モカがコーヒーを飲んでいる姿を描いたデザインで、朝のコーヒータイムがより楽しくなります。トートバッグは、お買い物やお出かけの際に大活躍する実用的なデザインです。\n\nすべての商品は高品質な素材を使用し、モカファンの皆様に愛用していただけるよう丁寧に製作されています。',
    imageUrl: '/placeholder-news-1.jpg',
    publishedAt: new Date('2024-01-15'),
    category: 'グッズ',
    isPublished: true,
  },
  {
    id: 2,
    title: 'モカの日常 - コーヒーブレイクの時間',
    summary: 'モカが愛用するコーヒー豆と、おすすめの淹れ方についてご紹介します。特別なレシピも公開します。',
    content: 'モカの日常シリーズ、今回はコーヒーブレイクの時間についてご紹介します。\n\nモカが愛用しているコーヒー豆は、エチオピア産のモカ豆です。その香り高さと甘みのある味わいが、モカのお気に入りです。\n\n淹れ方のコツは、豆を挽いてからすぐに淹れること。そして、お湯の温度は90度前後がベストです。\n\n今回は特別に、モカが考案した「モカスペシャルレシピ」も公開します。少しのシナモンとブラウンシュガーを加えることで、より甘くて香り高いコーヒーが楽しめます。',
    imageUrl: '/placeholder-news-2.jpg',
    publishedAt: new Date('2024-01-10'),
    category: '日常',
    isPublished: true,
  },
  {
    id: 3,
    title: 'モカファンイベント開催決定！',
    summary: 'オンラインでモカと一緒にコーヒータイムを楽しむイベントを開催します。参加者には限定グッズをプレゼント！',
    content: 'モカファンの皆様にお知らせです。オンラインイベント「モカと一緒にコーヒータイム」を開催いたします。\n\n日時：2024年2月14日（水）19:00-20:00\n\n内容：\n- モカとのオンラインコーヒータイム\n- 新商品のお披露目\n- モカクイズ大会\n- 参加者限定グッズのプレゼント\n\n参加方法は簡単です。SNSでイベント情報をシェアしていただいた方の中から抽選で100名様をご招待いたします。\n\n参加ご希望の方は、SNSでイベント情報をシェアして、ハッシュタグ「#モカコーヒータイム」をつけて投稿してください。',
    imageUrl: '/placeholder-news-3.jpg',
    publishedAt: new Date('2024-01-08'),
    category: 'イベント',
    isPublished: true,
  },
  {
    id: 4,
    title: 'モカの読書タイム - おすすめ本のご紹介',
    summary: 'モカが最近読んでいる本や、お気に入りの本についてご紹介します。読書好きなモカの一面をのぞいてみませんか？',
    content: 'モカの読書タイムシリーズ、今回はモカが最近読んでいる本についてご紹介します。\n\nモカは特に小説やエッセイを好んで読んでいます。最近のお気に入りは、村上春樹さんの「1Q84」です。その独特な世界観と深いテーマに、モカも夢中になっています。\n\nまた、コーヒーに関する本も愛読しており、バリスタの技術書からコーヒーの歴史まで、幅広く読んでいます。\n\n読書の際は、お気に入りのコーヒーと一緒に過ごすことが多いモカ。皆様もぜひ、お気に入りの本とコーヒーで素敵な読書タイムをお過ごしください。',
    imageUrl: '/placeholder-news-4.jpg',
    publishedAt: new Date('2024-01-05'),
    category: '日常',
    isPublished: true,
  },
  {
    id: 5,
    title: 'モカの季節の変化 - 冬の装い',
    summary: '寒い冬を迎えたモカの新しい装いをご紹介します。温かみのあるデザインで、冬の寒さも吹き飛ばします。',
    content: '季節が冬に変わったモカの新しい装いをご紹介します。\n\nモカは冬の寒さを吹き飛ばす、温かみのある装いを心がけています。マフラーやニット帽など、可愛らしい防寒具を身に着けています。\n\nまた、冬のコーヒータイムも特別です。ホットココアやカフェラテなど、温かい飲み物を楽しんでいます。\n\n冬の装いのモカは、より一層可愛らしく見えます。皆様もぜひ、温かい装いで冬を楽しんでください。',
    imageUrl: '/placeholder-news-5.jpg',
    publishedAt: new Date('2024-01-01'),
    category: '季節',
    isPublished: true,
  },
]

const categories = ['すべて', 'グッズ', '日常', 'イベント', '季節']

export function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [selectedNews, setSelectedNews] = useState<typeof newsData[0] | null>(null)

  // カテゴリフィルター
  const filteredNews = selectedCategory === 'すべて'
    ? newsData
    : newsData.filter(news => news.category === selectedCategory)

  return (
    <div>
      {/* カテゴリフィルター */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ニュース一覧 */}
      <div className="space-y-8">
        {filteredNews.map((news) => (
          <article
            key={news.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            onClick={() => setSelectedNews(news)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* 画像 */}
              <div className="aspect-video md:aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg relative overflow-hidden">
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
                  <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{news.category}</span>
                  </span>
                </div>
              </div>

              {/* コンテンツ */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-amber-600 transition-colors">
                    {news.title}
                  </h3>

                  {/* サマリー */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {news.summary}
                  </p>
                </div>

                {/* 続きを読むリンク */}
                <div className="mt-4">
                  <span className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
                    続きを読む
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* モーダル */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden">
            {/* モーダルヘッダー */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-amber-100 text-amber-600 text-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>{selectedNews.category}</span>
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <time dateTime={selectedNews.publishedAt.toISOString()}>
                        {selectedNews.publishedAt.toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {selectedNews.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                >
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* モーダルコンテンツ */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* 画像 */}
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-5xl">📰</span>
                  </div>
                  <p className="text-gray-600 font-medium">ニュース画像</p>
                  <p className="text-sm text-gray-500">（実際の画像に置き換え予定）</p>
                </div>
              </div>

              {/* 本文 */}
              <div className="prose prose-lg max-w-none">
                {selectedNews.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* アクションボタン */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <span>SNSでシェア</span>
                  </button>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <span>お問い合わせ</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





