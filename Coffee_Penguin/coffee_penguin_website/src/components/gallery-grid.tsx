'use client'

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import { ExternalLink, X } from 'lucide-react'
import type { GalleryItem } from '@/types/gallery'
import { formatInstagramTimestamp } from '@/lib/instagram'

interface GalleryGridProps {
  posts: GalleryItem[]
}

export function GalleryGrid({ posts }: GalleryGridProps) {
  const [selectedPost, setSelectedPost] = useState<GalleryItem | null>(null)

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-10 text-center">
        <p className="text-sm text-amber-700">投稿を表示できませんでした。時間をおいて更新してください。</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className={`relative ${post.mediaType === 'VIDEO' ? 'aspect-video' : 'aspect-square'} overflow-hidden`}>
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    詳しく見る
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-600">
                  {post.platform}
                </span>
                <time>{formatInstagramTimestamp(post.timestamp)}</time>
              </div>
              <h3 className="mt-2 font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.description}</p>
              <div className="mt-3 text-right">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                  onClick={(event) => event.stopPropagation()}
                >
                  {post.platform}で見る
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{selectedPost.platform}</p>
                <h3 className="text-xl font-bold text-gray-900">{selectedPost.title}</h3>
                <time className="text-sm text-gray-500">{formatInstagramTimestamp(selectedPost.timestamp)}</time>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="閉じる"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-gray-100">
                {selectedPost.mediaType === 'VIDEO' && selectedPost.embedUrl ? (
                  <iframe
                    src={selectedPost.embedUrl}
                    title={selectedPost.title}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedPost.mediaUrl}
                    alt={selectedPost.title}
                    className="block w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedPost.caption || selectedPost.description}</p>
                <a
                  href={selectedPost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  {selectedPost.platform}で見る
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

