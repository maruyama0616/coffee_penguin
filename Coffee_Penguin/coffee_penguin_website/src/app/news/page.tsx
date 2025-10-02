import { Metadata } from 'next'
import { NewsList } from '@/components/news-list'

export const metadata: Metadata = {
  title: 'News - 最新情報 | Coffee Penguin',
  description: 'モカの最新情報やお知らせをお届けします。新商品の発表、イベント情報、日常のアップデートなど、モカファン必見のニュースです。',
}

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-4xl">📰</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              最新情報
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              モカの最新情報やお知らせをお届けします。<br />
              新商品の発表、イベント情報、日常のアップデートなど、<br />
              モカファン必見のニュースです。
            </p>
          </div>
        </div>
      </section>

      {/* ニュース一覧セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsList />
        </div>
      </section>

      {/* ニュースレター登録セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📧</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              最新情報をお見逃しなく
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              モカの最新情報をメールでお届けします。<br />
              新商品やイベント情報をいち早くお知らせします。
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="メールアドレスを入力"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                  登録する
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                プライバシーポリシーに同意の上、登録してください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}









