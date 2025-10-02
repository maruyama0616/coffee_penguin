import { Heart, Users, TrendingUp, Coffee } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: '癒し',
    description: '忙しい日常の中で、モカがそっと寄り添って心を癒してくれます。温かいコーヒーのような安らぎを提供します。',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Users,
    title: '共感',
    description: '同じような悩みや喜びを共有し、モカと一緒に成長していく仲間として、あなたの気持ちに寄り添います。',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: TrendingUp,
    title: '成長支援',
    description: '新しいことに挑戦する勇気や、困難を乗り越える力を、モカと一緒に見つけていきましょう。',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Coffee,
    title: 'コーヒー愛',
    description: '香り高いコーヒーを愛するモカと一緒に、特別なコーヒータイムを楽しみませんか？',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
]

export function MokaFeatures() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            モカの魅力
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            コーヒーペンギンのモカが提供する4つの価値で、<br />
            あなたの日常をより豊かに彩ります
          </p>
        </div>

        {/* 特徴グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="text-center group"
              >
                {/* アイコン */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                </div>

                {/* タイトル */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                {/* 説明 */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* ボトムセクション */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">🐧</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              モカと一緒に、特別な時間を
            </h3>
            
            <p className="text-lg text-gray-600 mb-6">
              毎日の小さな幸せから、人生の大きな変化まで。<br />
              モカはいつもあなたのそばにいます。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                モカについてもっと知る
              </button>
              <button className="border border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-medium transition-colors">
                SNSでフォロー
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

