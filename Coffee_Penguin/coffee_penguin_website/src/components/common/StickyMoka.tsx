'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MokaPose } from '@/types/moka'
import { MokaCharacter } from '@/components/common/moka-character'

const SECTION_POSES: Record<string, MokaPose> = {
  hero: 'greeting',
  about: 'thinking',
  gallery: 'excited',
  shop: 'shopping',
  news: 'reading',
  contact: 'waving',
  footer: 'sleeping',
}

export function StickyMoka() {
  const [currentPose, setCurrentPose] = useState<MokaPose>('greeting')
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll()

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, -1])

  useEffect(() => {
    const sections = document.querySelectorAll('[data-moka-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-moka-section')
            if (sectionId && SECTION_POSES[sectionId]) {
              setCurrentPose(SECTION_POSES[sectionId])
            }
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px',
      }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-1/2 right-8 z-40 pointer-events-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ y: floatY, rotate: rotateZ, transform: 'translateY(-50%)' }}
    >
      <MokaCharacter pose={currentPose} />
    </motion.div>
  )
}


