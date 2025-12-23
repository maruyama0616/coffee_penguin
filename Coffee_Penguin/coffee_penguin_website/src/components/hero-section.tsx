import Image from 'next/image'

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
        <div className="flex justify-center items-center">
          {/* 中央: Mochaのビジュアルのみ */}
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
