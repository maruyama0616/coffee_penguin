import type { GalleryItem } from '@/types/gallery'

const INSTAGRAM_FIELDS = 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url'

interface InstagramRawPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | string
  media_url?: string
  permalink: string
  timestamp: string
  thumbnail_url?: string
}

function splitCaption(caption: string) {
  const lines = caption
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const title = lines[0]?.replace(/#[^\s#]+/g, '').trim() || 'Instagram投稿'
  const description = lines.slice(1).join(' ') || caption

  return { title: title || 'Instagram投稿', description }
}

function toInstagramPost(raw: InstagramRawPost): GalleryItem | null {
  const mediaUrl = raw.media_url || raw.thumbnail_url

  if (!mediaUrl) {
    return null
  }

  const caption = raw.caption ?? ''
  const { title, description } = splitCaption(caption)

  return {
    id: raw.id,
    title,
    description,
    caption,
    mediaType: 'IMAGE',
    mediaUrl,
    thumbnailUrl: raw.thumbnail_url,
    permalink: raw.permalink,
    timestamp: raw.timestamp,
    platform: 'Instagram',
  }
}

async function fetchInstagramFeed(url: string, limit: number, collected: GalleryItem[]): Promise<GalleryItem[]> {
  const response = await fetch(url, { next: { revalidate: 60 * 15 } })

  if (!response.ok) {
    console.error('Failed to fetch Instagram feed', { status: response.status, statusText: response.statusText })
    return collected
  }

  const payload = (await response.json()) as {
    data?: InstagramRawPost[]
    paging?: { next?: string }
  }

  const posts = payload.data?.map(toInstagramPost).filter((post): post is GalleryItem => Boolean(post)) ?? []
  const nextCollected = [...collected, ...posts]

  if (nextCollected.length >= limit) {
    return nextCollected.slice(0, limit)
  }

  const nextUrl = payload.paging?.next

  if (!nextUrl || nextUrl === url) {
    return nextCollected
  }

  return fetchInstagramFeed(nextUrl, limit, nextCollected)
}

export async function getInstagramPosts(limit = 12): Promise<GalleryItem[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    console.warn('INSTAGRAM_ACCESS_TOKEN is not set')
    return []
  }

  const params = new URLSearchParams({
    fields: INSTAGRAM_FIELDS,
    limit: Math.min(limit, 50).toString(),
    access_token: token,
  })

  const url = `https://graph.instagram.com/me/media?${params.toString()}`

  try {
    const items = await fetchInstagramFeed(url, limit, [])
    return items.slice(0, limit)
  } catch (error) {
    console.error('Unexpected error fetching Instagram posts', error)
    return []
  }
}

export function formatInstagramTimestamp(timestamp: string): string {
  const parsed = new Date(timestamp)

  if (Number.isNaN(parsed.getTime())) {
    return timestamp
  }

  return new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium' }).format(parsed)
}
