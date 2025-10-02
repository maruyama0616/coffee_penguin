import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - モカについて | Coffee Penguin',
  description: 'コーヒーペンギンのモカのプロフィール、魅力、ストーリーをご紹介します。癒し・共感・成長支援を提供するモカの世界観をお楽しみください。',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-5xl">🐧</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            モカについて
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            コーヒーペンギンのモカは、忙しい現代人に<br />
            癒しと共感、そして成長のきっかけを提供する<br />
            特別な存在です。
          </p>
        </div>
      </section>

      {/* プロフィールセクション */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 画像エリア */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-6xl">🐧</span>
                      </div>
                      <p className="text-gray-600 font-medium">モカのプロフィール画像</p>
                      <p className="text-sm text-gray-500">（実際の画像に置き換え予定）</p>
                    </div>
                  </div>
                </div>
                
                {/* 装飾的な要素 */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">☕</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">💝</span>
                </div>
              </div>
            </div>

            {/* テキストエリア */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                モカのプロフィール
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">名前</h3>
                  <p className="text-gray-600">モカ（Mocha）</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">年齢</h3>
                  <p className="text-gray-600">永遠の20代（心はいつまでも若々しく）</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">好きなもの</h3>
                  <p className="text-gray-600">香り高いコーヒー、温かい時間、新しい出会い、読書、音楽</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">特技</h3>
                  <p className="text-gray-600">人の心に寄り添うこと、コーヒーを淹れること、悩みを聞くこと</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* モカの魅力セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              モカの魅力
            </h2>
            <p className="text-xl text-gray-600">
              モカが提供する特別な価値をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 癒し */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">癒し</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                忙しい日常の中で、モカがそっと寄り添って心を癒してくれます。温かいコーヒーのような安らぎを提供します。
              </p>
            </div>

            {/* 共感 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">共感</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                同じような悩みや喜びを共有し、モカと一緒に成長していく仲間として、あなたの気持ちに寄り添います。
              </p>
            </div>

            {/* 成長支援 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">成長支援</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                新しいことに挑戦する勇気や、困難を乗り越える力を、モカと一緒に見つけていきましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* モカのストーリーセクション */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              モカのストーリー
            </h2>
            <p className="text-xl text-gray-600">
              モカが生まれた背景と想いをご紹介します
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                モカは、現代社会で忙しく働く人々や、新しい環境に不安を感じる人々のために生まれました。
                一人ひとりが自分らしく生きられるように、温かいコーヒーのような安らぎを提供したいという想いから誕生したキャラクターです。
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                モカの名前の由来は、香り高い「モカコーヒー」から。コーヒーが持つ温かさと香り、そして人と人を結びつける力のように、
                モカも皆さんの心を温め、新しい出会いや成長のきっかけを提供したいと考えています。
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                毎日の小さな幸せから、人生の大きな変化まで。モカはいつもあなたのそばにいて、
                一緒に歩んでいきたいと思っています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* モカと一緒にセクション */}
      <section className="py-16 bg-gradient-to-br from-amber-100 to-orange-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            モカと一緒に、特別な時間を
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            SNSでモカの日常をフォローしたり、<br />
            グッズでモカと一緒に過ごしたりしませんか？
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://tiktok.com/@_coffeepenguin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
            >
              TikTokでフォロー
            </a>
            <Link
              href="/shop"
              className="border border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-medium transition-colors text-center"
            >
              グッズを見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}



