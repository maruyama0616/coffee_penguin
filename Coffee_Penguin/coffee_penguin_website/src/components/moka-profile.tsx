/* eslint-disable @next/next/no-img-element */

export function MokaProfile() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* プロフィール画像 */}
      <div className="mb-12">
        <div className="inline-block">
          <img
            src="/images/mocha-profile.png"
            alt="モカのプロフィール写真"
            className="w-64 h-64 sm:w-80 sm:h-80 object-contain mx-auto"
          />
        </div>
      </div>

      {/* プロフィール見出し */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">モカのプロフィール</h2>

      {/* プロフィール内容 */}
      <div className="space-y-6 text-left max-w-2xl mx-auto">
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
  )
}
