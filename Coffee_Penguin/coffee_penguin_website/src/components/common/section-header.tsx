import type { ReactNode } from "react"

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  children?: ReactNode
  alignment?: "left" | "center"
  className?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  children,
  alignment = "center",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses = alignment === "left" ? "items-start text-left" : "items-center text-center"
  const contentWidth = alignment === "left" ? "max-w-2xl" : "max-w-2xl"

  return (
    <div className={`flex flex-col ${alignmentClasses} gap-6 mb-12 ${className}`}>
      <div className={`${contentWidth} ${alignment === "center" ? "mx-auto" : ""}`}>
        {badge ? (
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 mb-3">
            {badge}
          </span>
        ) : null}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        {description ? <p className="text-lg text-gray-600">{description}</p> : null}
      </div>
      {children ? <div className={alignment === "center" ? "mx-auto" : ""}>{children}</div> : null}
    </div>
  )
}
