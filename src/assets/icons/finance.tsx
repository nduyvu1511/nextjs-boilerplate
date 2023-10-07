'use client'

import { Colors } from '@/constants'
import { IconProps } from '@/types'

export const FinanceIcon = ({ className, fill = Colors.gray70, size = 24 }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="4" width="20" height="16" rx="4" stroke={fill} stroke-width="1.5" />
      <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 17 17)" fill={fill} />
      <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 5 9)" fill={fill} />
      <circle
        cx="2"
        cy="2"
        r="2"
        transform="matrix(1 0 0 -1 10 14)"
        stroke={fill}
        stroke-width="1.5"
      />
    </svg>
  )
}
