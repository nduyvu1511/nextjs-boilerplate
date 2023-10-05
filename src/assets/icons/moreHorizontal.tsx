'use client'

import { Colors } from '@/constants'
import { IconProps } from '@/types'

export const MoreHorizontalIcon = ({ className, fill = Colors.gray70, size = 24 }: IconProps) => {
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
        d="M6.5 11.25C6.5 11.9404 7.05964 12.5 7.75 12.5C8.44036 12.5 9 11.9404 9 11.25C9 10.5596 8.44036 10 7.75 10C7.05964 10 6.5 10.5596 6.5 11.25ZM12.75 12.5C12.0596 12.5 11.5 11.9404 11.5 11.25C11.5 10.5596 12.0596 10 12.75 10C13.4404 10 14 10.5596 14 11.25C14 11.9404 13.4404 12.5 12.75 12.5ZM17.75 12.5C17.0596 12.5 16.5 11.9404 16.5 11.25C16.5 10.5596 17.0596 10 17.75 10C18.4404 10 19 10.5596 19 11.25C19 11.9404 18.4404 12.5 17.75 12.5Z"
        fill={fill}
      />
    </svg>
  )
}