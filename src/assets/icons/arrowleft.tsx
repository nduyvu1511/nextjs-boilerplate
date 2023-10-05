'use client'

import { Colors } from '@/constants'
import { IconProps } from '@/types'

export const ArrowLeftIcon = ({ className, fill = Colors.gray70, size = 24 }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 7L10 12L14 17"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
