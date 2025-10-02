import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Music } from 'lucide-react'
import { XLogo } from '@/components/common/x-logo'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/coffee_penguin_moka',
    icon: Instagram,
  },
  {
    name: 'X',
    href: 'https://twitter.com/_CoffeePenguin',
    icon: XLogo,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@coffeepenguin_youtube',
    icon: Youtube,
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@_coffeepenguin',
    icon: Music,
  },
]

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'News', href: '/news' },
  ],
  shop: [
    { name: 'Shop', href: '/shop' },
    { name: 'Suzuri', href: 'https://suzuri.jp/coffee_penguin_moka', external: true },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/Coffee Penguin Logo White.png"
                alt="Coffee Penguin ロゴ"
                width={48}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              モカと一緒に、癒しと共感と成長を。
            </p>
            {/* SNSリンク */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ショップ */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Coffee Penguin. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for Mocha fans
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

