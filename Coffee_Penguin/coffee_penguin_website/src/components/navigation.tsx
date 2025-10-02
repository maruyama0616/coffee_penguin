'use client'

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const leftNavigation = [
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News', href: '/news' },
]

const rightNavigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Contact', href: '/contact' },
]

const allNavigation = [...leftNavigation, ...rightNavigation]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div
          className="relative h-14 rounded-[20px] shadow-[0_8px_24px_rgba(45,24,16,0.25)] border flex items-center justify-between px-4 md:px-6"
          style={{
            background: 'color-mix(in srgb, var(--coffee-black) 92%, transparent)',
            borderColor: 'rgba(212,196,168,0.16)',
          }}
        >
          <div className="hidden md:flex items-center space-x-6">
            {leftNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2 py-1 text-[12px] font-medium tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ color: 'color-mix(in srgb, var(--coffee-cream) 92%, #ffffff 8%)' }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex items-center justify-center" aria-label="Coffee Penguin">
              <img
                src="/images/Coffee Penguin Logo White.png"
                alt="Coffee Penguin ロゴ"
                className="block h-16 md:h-18 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {rightNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2 py-1 text-[12px] font-medium tracking-[0.12em] transition-opacity hover:opacity-85"
                style={{ color: 'color-mix(in srgb, var(--coffee-cream) 92%, #ffffff 8%)' }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="メニューを開く"
              className="text-white/90"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t"
            style={{
              background: 'rgba(250, 249, 246, 0.95)',
              borderColor: 'rgba(0,0,0,0.06)',
            }}
          >
            {allNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium transition-opacity duration-300 hover:opacity-70"
                style={{ color: 'var(--coffee-black)' }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
