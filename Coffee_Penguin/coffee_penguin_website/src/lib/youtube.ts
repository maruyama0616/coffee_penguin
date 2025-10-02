import type { GalleryItem } from '@/types/gallery'

const YT_SEARCH_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search'

interface YouTubeSearchResponse {
  items?: Array<{
    id?: { videoId?: string }
    snippet?: {
      title?: string
      description?: string
      publishedAt?: string
      thumbnails?: {
        maxres?: { url?: string }
        high?: { url?: string }
        medium?: { url?: string }
        standard?: { url?: string }
        default?: { url?: string }
      }
    }
  }>
}

function pickThumbnail(snippet?: NonNullable<YouTubeSearchResponse['items']>[number]['snippet']) {
  const candidates = [
    snippet?.thumbnails?.maxres?.url,
    snippet?.thumbnails?.high?.url,
    snippet?.thumbnails?.standard?.url,
    snippet?.thumbnails?.medium?.url,
    snippet?.thumbnails?.default?.url,
  ]

  return candidates.find((url) => !!url) || ''
}

export async function getYouTubeVideos(limit = 4): Promise<GalleryItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    console.warn('YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID is not set')
    return []
  }

  const params = new URLSearchParams({
    part: 'snippet',
    channelId,
    order: 'date',
    type: 'video',
    maxResults: Math.min(limit, 15).toString(),
    key: apiKey,
  })

  const response = await fetch(`${YT_SEARCH_ENDPOINT}?${params.toString()}`, {
    next: { revalidate: 60 * 15 },
  })

  if (!response.ok) {
    console.error('Failed to fetch YouTube feed', {
      status: response.status,
      statusText: response.statusText,
    })
    return []
  }

  const payload = (await response.json()) as YouTubeSearchResponse
  const items = payload.items ?? []

  const videos = items
    .map((item) => {
      const videoId = item.id?.videoId
      const snippet = item.snippet

      if (!videoId || !snippet) {
        return null
      }

      const permalink = `https://www.youtube.com/watch?v=${videoId}`
      const embedUrl = `https://www.youtube.com/embed/${videoId}`
      const mediaUrl = pickThumbnail(snippet)

      if (!mediaUrl) {
        return null
      }

      return {
        id: `youtube-${videoId}`,
        title: snippet.title || 'YouTube動画',
        description: snippet.description || 'YouTube動画',
        caption: snippet.description,
        mediaType: 'VIDEO' as const,
        mediaUrl,
        thumbnailUrl: mediaUrl,
        permalink,
        timestamp: snippet.publishedAt || new Date().toISOString(),
        platform: 'YouTube' as const,
        embedUrl,
      }
    })
    .filter(Boolean) as GalleryItem[]

  return videos.slice(0, limit)
}
