'use client'

import { Colors } from '@/constants'
import { IconProps } from '@/types'

export const BagIcon = ({ className, fill = Colors.gray70, size = 24 }: IconProps) => {
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
        d="M16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.56224 9.50386C4.81245 7.50215 6.51406 6 8.53135 6H15.4691C17.4864 6 19.188 7.50215 19.4382 9.50386L20.4382 17.5039C20.7366 19.8913 18.8751 22 16.4691 22H7.53135C5.12536 22 3.26381 19.8913 3.56224 17.5039L4.56224 9.50386Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M9 16C11.3561 17.3404 12.6476 17.3263 15 16"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
