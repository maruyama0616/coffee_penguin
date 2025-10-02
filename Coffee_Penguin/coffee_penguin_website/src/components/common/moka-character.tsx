"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { TargetAndTransition } from "framer-motion"
import type { MokaPose } from "@/types/moka"

interface MokaCharacterProps {
  pose: MokaPose
  size?: "small" | "medium" | "large"
  className?: string
}

type AnimationSegment = TargetAndTransition | TargetAndTransition[]

interface PoseAnimation {
  body: AnimationSegment
  arm?: AnimationSegment
  expression: string
}

const POSE_ANIMATIONS: Record<MokaPose, PoseAnimation> = {
  greeting: {
    body: { rotateZ: 0, scale: 1 },
    arm: { rotateZ: [0, 15, 0], transition: { repeat: Infinity, duration: 1.5 } },
    expression: "(^_^)/",
  },
  thinking: {
    body: { rotateZ: 3, scale: 0.95 },
    arm: { rotateZ: 45, y: -10 },
    expression: "(._.)",
  },
  excited: {
    body: { rotateZ: [0, -2, 2, 0], scale: 1.1, transition: { repeat: Infinity, duration: 0.8 } },
    arm: { rotateZ: [0, 20, 0], y: [-5, 0, -5], transition: { repeat: Infinity, duration: 0.6 } },
    expression: "(>_<)",
  },
  shopping: {
    body: { rotateZ: -5, scale: 1 },
    arm: { rotateZ: -30, x: 15 },
    expression: "(^o^)",
  },
  reading: {
    body: { rotateZ: 0, scale: 1 },
    arm: { rotateZ: 0, y: 5 },
    expression: "(-.-)",
  },
  waving: {
    body: { rotateZ: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 2 } },
    arm: { rotateZ: [0, -20, 20, 0], transition: { repeat: Infinity, duration: 1 } },
    expression: "(o^_^o)",
  },
  sleeping: {
    body: { rotateZ: 15, scale: 0.9 },
    arm: { rotateZ: 0, y: 10 },
    expression: "(z_z)",
  },
}

const SIZE_CLASSES: Record<NonNullable<MokaCharacterProps["size"]>, string> = {
  small: "w-16 h-16",
  medium: "w-24 h-24",
  large: "w-32 h-32",
}

export function MokaCharacter({ pose, size = "large", className = "" }: MokaCharacterProps) {
  const animation = POSE_ANIMATIONS[pose]
  const sizeClass = SIZE_CLASSES[size]

  return (
    <div className={`relative moka-character ${sizeClass} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pose}
          className="w-full h-full relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Character body */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--coffee-brown)" }}
            animate={Array.isArray(animation.body) ? animation.body[0] : animation.body}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Belly */}
            <div className="absolute inset-x-2 top-2 bottom-4 rounded-full" style={{ background: "var(--paper-white)" }} />

            {/* Arm */}
            <motion.div
              className="absolute -right-1 top-4 w-3 h-8 rounded"
              style={{ border: "2px solid var(--coffee-black)" }}
              animate={animation.arm && (Array.isArray(animation.arm) ? animation.arm[0] : animation.arm)}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Expression */}
            <motion.div
              className="absolute inset-x-0 top-6 text-center text-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {animation.expression}
            </motion.div>
          </motion.div>

          {/* Pose accessories */}
          {pose === "shopping" && (
            <motion.div
              className="absolute -left-2 top-2 w-4 h-4 rounded-sm"
              style={{ background: "var(--copper-accent)" }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: -15 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs">bag</div>
            </motion.div>
          )}

          {pose === "reading" && (
            <motion.div
              className="absolute -left-3 bottom-2 w-6 h-4"
              style={{ background: "var(--vintage-beige)", border: "1px solid var(--warm-gray)" }}
              initial={{ scale: 0, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs">book</div>
            </motion.div>
          )}

          {pose === "sleeping" && (
            <motion.div
              className="absolute -top-2 -right-2 flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              <div className="text-xs">zzz</div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
