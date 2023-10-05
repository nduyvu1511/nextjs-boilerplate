'use client'

import { IconProps } from '@/types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'
import { Colors } from '@/constants'

export type ButtonProps = {
  title?: string
  disabled?: boolean
  loading?: boolean
  type?: 'contained' | 'pill' | 'outlined'
  className?: string
  titleClassName?: string
  renderIcon?: (props: IconProps) => JSX.Element
  onClick?: () => void
}

export const Button = ({
  type = 'contained',
  title,
  loading,
  disabled,
  className,
  titleClassName,
  renderIcon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={(e) => {
        e?.stopPropagation?.()
        onClick?.()
      }}
      className={twMerge(
        classNames(
          'bg-primary px-[16px] py-[10px] rounded-md flex items-center',
          type === 'pill' && 'rounded-full px-[24px]',
          type === 'outlined' &&
            'bg-white border-primary border-2 border-solid rounded-[25px] px-[24px]',
          disabled && 'opacity-70 cursor-not-allowed',
          !disabled && !loading && 'hover:opacity-80',
          className
        )
      )}
    >
      <span
        className={twMerge(
          classNames(
            'text-base text-white font-semibold select-none',
            type === 'outlined' && 'text-primary',
            titleClassName
          )
        )}
      >
        {title}
      </span>

      {renderIcon ? (
        <p className="ml-[12px]">{renderIcon({ className: 'text-white w-[18px] h-[18px]' })}</p>
      ) : null}

      {loading ? <Spinner size={16} className="ml-[12px]" fill={Colors.white} /> : null}
    </button>
  )
}
