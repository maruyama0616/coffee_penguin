import Image from 'next/image'
import Link from 'next/link'

// import mochaFront03 from '@/images/Mocha/Mocha Front 03.png'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #F5F1E8 0%, #E8DCC4 50%, #D4E1ED 100%)" }}>
      {/* 背景装飾 - 淡いテクスチャ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {/* コーヒーの湯気をイメージした曲線 */}
        <svg className="absolute top-20 left-10 w-64 h-64 text-coffee-medium opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.8C26.4,84.6,10,87.6,-5.7,86.2C-21.4,84.8,-36.4,79,-49.8,70.4C-63.2,61.8,-75,50.4,-82.4,36.8C-89.8,23.2,-92.8,7.4,-91.2,-8.1C-89.6,-23.6,-83.4,-38.8,-73.9,-51.8C-64.4,-64.8,-51.6,-75.6,-37.4,-82.6C-23.2,-89.6,-7.6,-92.8,6.7,-91.1C21,-89.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-32 right-20 w-96 h-96 text-steel-blue opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M41.3,-72.5C54.4,-66.3,66.6,-57.5,74.8,-45.8C83,-34.1,87.2,-19.5,87.8,-4.7C88.4,10.1,85.4,25.1,78.2,38.4C71,51.7,59.6,63.3,46.2,70.8C32.8,78.3,17.4,81.7,1.8,78.9C-13.8,76.1,-29.6,67.1,-43.2,58.4C-56.8,49.7,-68.2,41.3,-75.4,29.8C-82.6,18.3,-85.6,3.7,-84.1,-10.6C-82.6,-24.9,-76.6,-38.9,-67.4,-50.8C-58.2,-62.7,-45.8,-72.5,-32.3,-78.5C-18.8,-84.5,-4.2,-86.7,9.3,-83.8C22.8,-80.9,28.2,-78.7,41.3,-72.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* 左側: 大胆なMochaのビジュアル */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative">
              {/* メインキャラクター */}
              <div className="moka-character relative z-20">
                <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                  <Image
                    src="/images/mocha-hero-new.png"
                    alt="Mocha the Coffee Penguin"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    priority
                    sizes="(min-width: 1024px) 500px, (min-width: 640px) 400px, 280px"
                  />
                </div>
              </div>
              
              {/* 装飾的な円 */}
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-steel-blue/20 blur-2xl -z-10"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-warm-beige/30 blur-3xl -z-10"></div>
            </div>
          </div>

          {/* 右側: キャッチコピーとナビゲーション */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-8">
            
            {/* 小さなバッジ */}
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-5 py-2.5 border border-coffee-light/20 shadow-sm">
              <div className="w-2 h-2 bg-coffee-medium rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-coffee-dark tracking-wide">Mocha the Coffee Penguin</span>
            </div>

            {/* メインキャッチコピー */}
            <h1 className="space-y-2">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-light text-coffee-dark leading-tight tracking-tight">
                静けさの中で、
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-light text-coffee-medium leading-tight tracking-tight">
                ゆっくりと。
              </span>
            </h1>

            {/* サブコピー */}
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0">
              コーヒーを淹れるように、丁寧に。<br />
              モカと一緒に、心を整える時間を。
            </p>

            {/* CTAボタン群 - シンプルに */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link 
                href="/stories" 
                className="inline-flex items-center justify-center px-8 py-4 bg-coffee-dark text-white rounded-full font-medium hover:bg-coffee-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                物語を読む
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-coffee-dark rounded-full font-medium border border-coffee-light/30 hover:bg-white hover:border-coffee-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                モカについて
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* スクロールガイド - 控えめに */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-xs text-coffee-medium tracking-widest uppercase">Scroll</span>
        <svg className="w-6 h-6 text-coffee-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
