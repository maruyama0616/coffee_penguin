import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { Instagram, Youtube, Music } from 'lucide-react'
import { XLogo } from '@/components/common/x-logo'

import mochaFront03 from '@/images/Mocha/Mocha Front 03.png'

const socialLinks = [

  {

    name: 'Instagram',

    href: 'https://instagram.com/_coffeepenguin',

    icon: Instagram,

    color: 'hover:text-pink-500',

  },

  {

    name: 'X',

    href: 'https://twitter.com/_CoffeePenguin',

    icon: XLogo,

    color: 'hover:text-blue-400',

  },

  {

    name: 'YouTube',

    href: 'https://youtube.com/@coffeepenguin_youtube',

    icon: Youtube,

    color: 'hover:text-red-500',

  },

  {

    name: 'TikTok',

    href: 'https://tiktok.com/@_coffeepenguin',

    icon: Music,

    color: 'hover:text-black',

  },

]

export function HeroSection() {

  return (

    <section className="relative py-20 lg:py-32" style={{ background: "var(--vintage-beige)" }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* 左 60%: モカ大型ビジュアル */}

          <div className="lg:col-span-7">

            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-[32px] overflow-hidden border border-[var(--light-gray)]" style={{ background: "linear-gradient(135deg, var(--coffee-cream), #f0e8d8)" }}>

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="moka-character select-none flex flex-col items-center">

                  <div className="w-48 h-48 lg:w-[60%] lg:h-[60%] rounded-full overflow-hidden mx-auto shadow-xl border border-[var(--light-gray)] bg-[var(--paper-white)]/85">

                    <Image

                      src={mochaFront03}

                      alt="Mocha the Coffee Penguin front illustration"

                      className="h-full w-full object-contain"

                      priority

                      sizes="(min-width: 1024px) 320px, 192px"

                    />

                  </div>

                  <div className="mt-6 text-center text-caption">Mocha the Coffee Penguin</div>

                </div>

              </div>

              {/* copper accent */}

              <div className="absolute -left-10 top-8 w-40 h-1" style={{ background: "var(--copper-accent)" }}></div>

              <div className="absolute right-6 bottom-10 w-24 h-24 rounded-full" style={{ background: "rgba(184,115,51,0.08)" }}></div>

            </div>

          </div>

          {/* 右 40%: テキスト + CTA */}

          <div className="lg:col-span-5 text-left">

            <div className="inline-flex items-center bg-[var(--paper-white)]/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-[var(--light-gray)]">

              <div className="w-6 h-6 bg-[var(--coffee-brown)] rounded-full flex items-center justify-center mr-3">

                <span className="text-white font-bold text-xs">M</span>

              </div>

              <span className="text-[var(--warm-gray)] font-medium">Coffee Penguin</span>

            </div>

            <h1 className="text-hero mb-6">

              モカの世界へ

              <span className="block" style={{ color: "var(--coffee-brown)" }}>ようこそ</span>

            </h1>

            <p className="text-body mb-10">

              癒し・共感・成長支援を提供する<br />

              コーヒーペンギンのモカと一緒に、<br />

              温かい時間を過ごしませんか？

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" asChild>
                <Link href="/about">
                  モカについて
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--coffee-brown)] text-[var(--coffee-brown)] hover:bg-[var(--coffee-cream)]/30"
                asChild
              >
                <Link href="/shop">
                  グッズを見る
                </Link>
              </Button>
            </div>

            {/* SNSリンク */}

            <div className="flex space-x-6">

              {socialLinks.map((item) => {

                const Icon = item.icon

                return (

                  <a

                    key={item.name}

                    href={item.href}

                    target="_blank"

                    rel="noopener noreferrer"

                    className={`text-[var(--warm-gray)] ${item.color} transition-colors`}

                    aria-label={item.name}

                  >

                    <Icon className="h-6 w-6" />

                  </a>

                )

              })}

            </div>

          </div>

        </div>

      </div>

      {/* 背景装飾（控えめ） */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-24 left-16 w-24 h-24 rounded-full blur-2xl" style={{ background: "rgba(212,196,168,0.35)" }}></div>

        <div className="absolute bottom-24 right-16 w-40 h-40 rounded-full blur-2xl" style={{ background: "rgba(184,115,51,0.18)" }}></div>

      </div>

    </section>

  )

}


