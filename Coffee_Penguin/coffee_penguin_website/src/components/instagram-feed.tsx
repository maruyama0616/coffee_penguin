/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { SectionHeader } from "@/components/common/section-header"
import { formatInstagramTimestamp, getInstagramPosts } from "@/lib/instagram"
import { getYouTubeVideos } from "@/lib/youtube"
import { getTikTokItems } from "@/data/tiktok"
import type { GalleryItem } from "@/types/gallery"

const LATEST_POST_LIMIT = 4

function sortByTimestamp(items: GalleryItem[]) {
  return [...items].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export async function InstagramFeed() {
  console.log('Instagram/YouTube Environment check:', {
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN ? 'Set' : 'Not set',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY ? 'Set' : 'Not set',
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || 'Not set'
  })

  const [instagramPosts, youtubeVideos] = await Promise.all([
    getInstagramPosts(LATEST_POST_LIMIT * 2),
    getYouTubeVideos(LATEST_POST_LIMIT * 2),
  ])

  const tiktokItems = getTikTokItems()

  const combined = sortByTimestamp([
    ...instagramPosts,
    ...youtubeVideos,
    ...tiktokItems,
  ])
    .filter((item) => item.mediaUrl && item.permalink)
    .slice(0, LATEST_POST_LIMIT)

  if (combined.length === 0) {
    return (
      <section data-moka-section="gallery" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Gallery"
            description="Instagramの最新投稿"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-medium text-white shadow-lg"
            >
              ギャラリーをもっと見る
            </Link>
          </SectionHeader>
          <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-10 text-center">
            <p className="text-sm text-amber-700">
              投稿を取得できませんでした。時間を置いて再度ご確認ください。
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-moka-section="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Gallery"
          description="Instagram・YouTube・TikTokの最新投稿"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5"
          >
            ギャラリーをもっと見る
          </Link>
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {combined.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <Link href={item.permalink} target="_blank" rel="noopener noreferrer">
                <div className="relative aspect-square">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
                    {item.platform}
                  </span>
                </div>
              </Link>
              <div className="p-4">
                <time className="text-xs uppercase tracking-wide text-gray-500">
                  {formatInstagramTimestamp(item.timestamp)}
                </time>
                <p className="mt-1 text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{item.description}</p>
                <div className="mt-3 text-right">
                  <Link
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    {item.platform}で見る
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
