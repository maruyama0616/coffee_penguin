import Link from 'next/link'
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery-grid'
import { SectionHeader } from '@/components/common/section-header'
import { getInstagramPosts } from '@/lib/instagram'
import { getYouTubeVideos } from '@/lib/youtube'
import { getTikTokItems } from '@/data/tiktok'
import type { GalleryItem } from '@/types/gallery'

export const metadata: Metadata = {
  title: 'Gallery - Coffee Penguin',
  description:
    'Coffee PenguinのInstagramから最新の写真やイベントの様子をご紹介。焙煎室の裏側からグッズ撮影の舞台裏まで、日々のストーリーをお楽しみください。',
}

const INSTAGRAM_POST_LIMIT = 24
const YOUTUBE_POST_LIMIT = 4

export default async function GalleryPage() {
  const [instagramPosts, youtubeVideos] = await Promise.all([
    getInstagramPosts(INSTAGRAM_POST_LIMIT),
    getYouTubeVideos(YOUTUBE_POST_LIMIT),
  ])

  const sections: Array<{
    id: string
    title: string
    badge: string
    description: string
    items: GalleryItem[]
  }> = [
    {
      id: 'instagram',
      title: 'Instagram',
      badge: 'Instagram',
      description: '最新の写真やストーリーをこちらでまとめています。',
      items: instagramPosts,
    },
    {
      id: 'youtube',
      title: 'YouTube',
      badge: 'YouTube',
      description: '公式チャンネルの最新動画をチェックしてください。',
      items: youtubeVideos,
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      badge: 'TikTok',
      description: 'ショート動画でモカのカフェライフをお届け。',
      items: getTikTokItems(),
    },
  ].filter((section) => section.items.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Gallery"
            description="Instagram・YouTube・TikTokなどの最新投稿をまとめてお届けします。"
          >
            <Link
              href="https://www.instagram.com/_coffeepenguin/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Instagramをフォローする
            </Link>
          </SectionHeader>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge={section.badge}
              title={section.title}
              description={section.description}
              alignment="left"
            />
            <GalleryGrid posts={section.items} />
          </div>
        </section>
      ))}
    </div>
  )
}

