/* eslint-disable @next/next/no-img-element */

export function MokaProfile() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* プロフィール画像 */}
      <div className="flex justify-center mb-16">
        <div className="w-48 h-48 md:w-64 md:h-64">
          <img
            src="/images/mocha-profile.png"
            alt="モカのプロフィール写真"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* タイトル */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3E2723] mb-4">
          モカのプロフィール
        </h2>
        <p className="text-lg text-[#5D4037] italic">Mocha the Coffee Penguin</p>
      </div>

      {/* プロフィール情報 */}
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* 基本情報 */}
        <div className="border-b border-[#D7CCC8] pb-6">
          <h3 className="text-xl font-bold text-[#3E2723] mb-4">基本情報</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="w-32 text-[#5D4037] font-medium">名前</span>
              <span className="text-[#3E2723]">モカ（Mocha）</span>
            </div>
            <div className="flex">
              <span className="w-32 text-[#5D4037] font-medium">誕生日</span>
              <span className="text-[#3E2723]">6月</span>
            </div>
            <div className="flex">
              <span className="w-32 text-[#5D4037] font-medium">年齢</span>
              <span className="text-[#3E2723]">8歳（人間でいうと25歳くらい）</span>
            </div>
            <div className="flex">
              <span className="w-32 text-[#5D4037] font-medium">種族</span>
              <span className="text-[#3E2723]">コーヒーペンギン</span>
            </div>
            <div className="flex">
              <span className="w-32 text-[#5D4037] font-medium">MBTI</span>
              <span className="text-[#3E2723]">ENFP（広報運動家）</span>
            </div>
          </div>
        </div>

        {/* 好きなもの */}
        <div className="border-b border-[#D7CCC8] pb-6">
          <h3 className="text-xl font-bold text-[#3E2723] mb-4">好きなもの</h3>
          <p className="text-[#3E2723] leading-relaxed">
            コーヒー、温かい場所、人との会話、新しい発見
          </p>
        </div>

        {/* 性格 */}
        <div className="border-b border-[#D7CCC8] pb-6">
          <h3 className="text-xl font-bold text-[#3E2723] mb-4">性格</h3>
          <p className="text-[#3E2723] leading-relaxed">
            人懐っこくて好奇心旺盛。コーヒーを淹れることと飲むことが大好きで、コーヒーの話になると目を輝かせて語り出します。少し天然なところもありますが、周りの人を笑顔にする温かい存在です。
          </p>
        </div>

        {/* 特技 */}
        <div className="border-b border-[#D7CCC8] pb-6">
          <h3 className="text-xl font-bold text-[#3E2723] mb-4">特技</h3>
          <p className="text-[#3E2723] leading-relaxed">
            コーヒーの淹れ方、ラテアート、人を笑顔にすること
          </p>
        </div>

        {/* チャームポイント */}
        <div className="pb-6">
          <h3 className="text-xl font-bold text-[#3E2723] mb-4">チャームポイント</h3>
          <p className="text-[#3E2723] leading-relaxed">
            頭の上のコーヒーポット型の帽子と、いつも持っているコーヒーカップ
          </p>
        </div>
      </div>
    </div>
  )
}
