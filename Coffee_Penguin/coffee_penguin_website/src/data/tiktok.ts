import type { GalleryItem } from '@/types/gallery'

export function getTikTokItems(): GalleryItem[] {
  return [
    {
      id: 'tiktok-2024-08',
      title: 'TikTok: モカの朝支度ルーティン',
      description: 'オープン前のカフェでモカがコーヒーを仕込む様子をショート動画でご紹介。',
      caption: 'TikTokでモカのモーニングルーティンをチェック！',
      mediaType: 'VIDEO',
      mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      thumbnailUrl: undefined,
      permalink: 'https://www.tiktok.com/@_coffeepenguin/video/7234567890123456789',
      timestamp: '2024-08-28T08:30:00+09:00',
      platform: 'TikTok',
      embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456789?lang=ja-JP',
    },
    {
      id: 'tiktok-2024-07',
      title: 'TikTok: モカのカフェ散歩',
      description: 'お気に入りの街角で出会ったスイーツとコーヒーを紹介するショート動画。',
      caption: '街角散歩で見つけたスイーツをご紹介！',
      mediaType: 'VIDEO',
      mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      thumbnailUrl: undefined,
      permalink: 'https://www.tiktok.com/@_coffeepenguin/video/7223456789012345678',
      timestamp: '2024-07-22T10:15:00+09:00',
      platform: 'TikTok',
      embedUrl: 'https://www.tiktok.com/embed/v2/7223456789012345678?lang=ja-JP',
    },
  ]
}
