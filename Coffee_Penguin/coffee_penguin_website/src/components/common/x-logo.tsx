import type { SVGProps } from 'react'

export function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M4 4h4.3l3.7 5.3L15.7 4H20l-6.7 9.2L20 20h-4.3l-4-5.7L7.9 20H4l7-9.6L4 4z"
        fill="currentColor"
      />
    </svg>
  )
}