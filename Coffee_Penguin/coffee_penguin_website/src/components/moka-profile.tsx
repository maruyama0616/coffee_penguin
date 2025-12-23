/* eslint-disable @next/next/no-img-element */

import { Coffee, Heart, Sparkles, Calendar, User, Cake } from 'lucide-react'
import { XLogo } from '@/components/common/x-logo'

export function MokaProfile() {
  const socialLinks = [
    {
      name: 'X',
      username: '@_coffeepenguin',
      url: 'https://twitter.com/_CoffeePenguin',
      icon: XLogo,
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Instagram',
      username: '@_coffeepenguin',
      url: 'https://instagram.com/_coffeepenguin',
      icon: '📷',
      color: 'from-pink-500 via-purple-500 to-orange-500',
    },
    {
      name: 'TikTok',
      username: '@_coffeepenguin',
      url: 'https://tiktok.com/@_coffeepenguin',
      icon: '🎵',
      color: 'from-gray-800 to-teal-500',
    },
    {
      name: 'YouTube',
      username: '@_coffeepenguin',
      url: 'https://youtube.com/@_coffeepenguin',
      icon: '▶️',
      color: 'from-red-500 to-red-600',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* プロフィール画像 */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/images/mocha-profile.png"
              alt="モカのプロフィール写真"
              className="w-full h-full object-contain"
            />
          </div>
          {/* 装飾的な要素 */}
          <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-3 shadow-lg animate-bounce">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 bg-pink-400 rounded-full p-3 shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* タイトル */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-coffee-dark mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-500" />
          モカのプロフィール
          <Sparkles className="w-8 h-8 text-amber-500" />
        </h2>
        <p className="text-lg text-coffee-medium italic">Mocha the Coffee Penguin</p>
      </div>

      {/* プロフィール内容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* 基本情報カード */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark">基本情報</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-lg font-semibold text-coffee-medium min-w-[80px]">名前</span>
              <span className="text-lg text-coffee-dark">モカ（Mocha）</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-lg font-semibold text-coffee-medium min-w-[80px] flex items-center gap-2">
                <Cake className="w-5 h-5 text-pink-500" />
                誕生日
              </span>
              <span className="text-lg text-coffee-dark">6月</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-lg font-semibold text-coffee-medium min-w-[80px]">年齢</span>
              <span className="text-lg text-coffee-dark">8歳（人間でいうと25歳くらい）</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-lg font-semibold text-coffee-medium min-w-[80px]">種族</span>
              <span className="text-lg text-coffee-dark">コーヒーペンギン</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-lg font-semibold text-coffee-medium min-w-[80px]">MBTI</span>
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                ENFP
              </span>
              <span className="text-sm text-gray-500">（広報運動家）</span>
            </div>
          </div>
        </div>

        {/* 好きなものカード */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border-2 border-amber-100 hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark">好きなもの</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span className="text-lg text-coffee-dark">コーヒー</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">☀️</span>
              <span className="text-lg text-coffee-dark">温かい場所</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💬</span>
              <span className="text-lg text-coffee-dark">人との会話</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-lg text-coffee-dark">新しい発見</span>
            </div>
          </div>
        </div>

        {/* 性格カード */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark">性格</h3>
          </div>
          
          <p className="text-lg text-coffee-dark leading-relaxed">
            人懐っこくて好奇心旺盛。コーヒーを淹れることと飲むことが大好きで、
            コーヒーの話になると目を輝かせて語り出します。
            少し天然なところもありますが、周りの人を笑顔にする温かい存在です。
          </p>
        </div>

        {/* 特技・チャームポイントカード */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 shadow-xl border-2 border-green-100 hover:shadow-2xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark">特技</h3>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span className="text-lg text-coffee-dark">コーヒーの淹れ方</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <span className="text-lg text-coffee-dark">ラテアート</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">😊</span>
              <span className="text-lg text-coffee-dark">人を笑顔にすること</span>
            </div>
          </div>
          
          <div className="pt-4 border-t-2 border-green-200">
            <h4 className="text-xl font-bold text-coffee-dark mb-3">チャームポイント</h4>
            <p className="text-lg text-coffee-dark">
              頭の上のコーヒーポット型の帽子と、いつも持っているコーヒーカップ
            </p>
          </div>
        </div>
      </div>

      {/* SNSセクション */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 shadow-xl border-2 border-purple-100">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-coffee-dark mb-2 flex items-center justify-center gap-3">
            <span className="text-3xl">🌟</span>
            SNSでつながろう
            <span className="text-3xl">🌟</span>
          </h3>
          <p className="text-lg text-coffee-medium">モカの日常をチェック！</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((social) => {
            const Icon = typeof social.icon === 'function' ? social.icon : null
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {Icon ? (
                      <Icon className="w-7 h-7 text-white" />
                    ) : (
                      <span className="text-2xl">{social.icon}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-coffee-dark group-hover:text-purple-600 transition-colors">
                      {social.name}
                    </h4>
                    <p className="text-sm text-gray-600">{social.username}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
