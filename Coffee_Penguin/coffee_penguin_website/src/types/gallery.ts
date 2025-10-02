export type GalleryPlatform = 'Instagram' | 'YouTube' | 'TikTok'

export interface GalleryItem {
  id: string
  title: string
  description: string
  caption?: string
  mediaType: 'IMAGE' | 'VIDEO'
  mediaUrl: string
  thumbnailUrl?: string
  permalink: string
  timestamp: string
  platform: GalleryPlatform
  embedUrl?: string
}
