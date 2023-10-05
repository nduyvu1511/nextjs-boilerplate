'use client'

import { Colors } from '@/constants'
import { IconProps } from '@/types'
import classNames from 'classnames'
import { Spinner } from '../spinner'

export type IconButtonProps = {
  disabled?: boolean
  loading?: boolean
  className?: string
  iconClassName?: string
  size?: number
  icon?: (props: IconProps) => JSX.Element
  onClick?: () => void
}

export const IconButton = ({
  loading,
  disabled,
  className,
  size = 36,
  icon,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      style={{ width: size, height: size }}
      onClick={() => onClick?.()}
      className={classNames(
        'flex items-center justify-center rounded-full transition-all duration-200 hover:bg-gray10',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
        className
      )}
    >
      {loading ? (
        <Spinner size={18} fill={Colors.text} />
      ) : icon ? (
        icon({ size: 24, fill: Colors.gray70 })
      ) : null}
    </button>
  )
}
