/* eslint-disable @next/next/no-img-element */

export function MokaProfile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="order-2 lg:order-1">
        <div className="relative">
          <div className="aspect-square rounded-2xl shadow-2xl overflow-hidden" style={{ background: "var(--warm-beige)" }}>
            <img
              src="/images/mocha-profile.png"
              alt="モカのプロフィール写真"
              className="w-full h-full object-contain p-8"
            />
          </div>

          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">☕</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl">❄️</span>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">モカのプロフィール</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">名前</h3>
            <p className="text-gray-600">モカ（Mocha）</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">年齢</h3>
            <p className="text-gray-600">8歳（人間でいうと25歳くらい）</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">種族</h3>
            <p className="text-gray-600">コーヒーペンギン</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">好きなもの</h3>
            <p className="text-gray-600">コーヒー、温かい場所、人との会話、新しい発見</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">性格</h3>
            <p className="text-gray-600">
              人懐っこくて好奇心旺盛。コーヒーを淹れることと飲むことが大好きで、
              コーヒーの話になると目を輝かせて語り出します。
              少し天然なところもありますが、周りの人を笑顔にする温かい存在です。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">特技</h3>
            <p className="text-gray-600">コーヒーの淹れ方、ラテアート、人を笑顔にすること</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">チャームポイント</h3>
            <p className="text-gray-600">頭の上のコーヒーポット型の帽子と、いつも持っているコーヒーカップ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
