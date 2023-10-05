'use client'

import { Colors } from '@/constants'
import { IconProps } from '@/types'

export const MoreVerticalIcon = ({ className, fill = Colors.gray70, size = 24 }: IconProps) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 6.25C10 5.55964 10.5596 5 11.25 5C11.9404 5 12.5 5.55964 12.5 6.25C12.5 6.94036 11.9404 7.5 11.25 7.5C10.5596 7.5 10 6.94036 10 6.25ZM10 11.25C10 10.5596 10.5596 10 11.25 10C11.9404 10 12.5 10.5596 12.5 11.25C12.5 11.9404 11.9404 12.5 11.25 12.5C10.5596 12.5 10 11.9404 10 11.25ZM11.25 15C10.5596 15 10 15.5596 10 16.25C10 16.9404 10.5596 17.5 11.25 17.5C11.9404 17.5 12.5 16.9404 12.5 16.25C12.5 15.5596 11.9404 15 11.25 15Z"
        fill={fill}
      />
    </svg>
  )
}
