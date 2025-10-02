import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { XLogo } from '@/components/common/x-logo'

export const metadata: Metadata = {
  title: 'Contact - お問い合わせ | Coffee Penguin',
  description: 'モカに関するご質問、ご要望、コラボレーションのお申し込みなど、お気軽にお問い合わせください。皆様からのメッセージをお待ちしています。',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-4xl">📧</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              モカに関するご質問、ご要望、コラボレーションのお申し込みなど、<br />
              お気軽にお問い合わせください。<br />
              皆様からのメッセージをお待ちしています。
            </p>
          </div>
        </div>
      </section>

      {/* お問い合わせフォームセクション */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* よくある質問セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              よくある質問
            </h2>
            <p className="text-xl text-gray-600">
              お問い合わせの前に、こちらもご確認ください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Q&A 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Q. グッズの購入方法を教えてください
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A. モカのグッズはSuzuriで販売しています。Shopページから商品をご確認いただき、Suzuriのサイトでご購入ください。
              </p>
            </div>

            {/* Q&A 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Q. コラボレーションのご相談はできますか？
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A. はい、お気軽にご相談ください。企業様とのコラボレーション、イベントでのモカの使用など、お問い合わせフォームからご連絡ください。
              </p>
            </div>

            {/* Q&A 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Q. モカの画像を使用したいのですが
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A. モカの画像の使用については、商用・非商用を問わずお問い合わせください。使用目的に応じて適切な許可をお出しします。
              </p>
            </div>

            {/* Q&A 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Q. 新しいグッズのリクエストはできますか？
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A. もちろんです！皆様からのリクエストは、新商品開発の参考にさせていただいています。お気軽にご意見をお聞かせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SNS連絡先セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SNSでもお気軽に
            </h2>
            <p className="text-xl text-gray-600">
              お問い合わせ以外にも、SNSでモカとの交流をお楽しみください
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Instagram */}
            <a
              href="https://instagram.com/coffee_penguin_moka"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📷</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Instagram</h3>
              <p className="text-sm opacity-90">日常の写真</p>
            </a>

            {/* X */}
            <a
              href="https://twitter.com/_CoffeePenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XLogo className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">X</h3>
              <p className="text-sm opacity-90">最新情報</p>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@coffeepenguin_youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📺</span>
              </div>
              <h3 className="font-bold text-lg mb-2">YouTube</h3>
              <p className="text-sm opacity-90">動画コンテンツ</p>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@_coffeepenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-bold text-lg mb-2">TikTok</h3>
              <p className="text-sm opacity-90">ショート動画</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}









