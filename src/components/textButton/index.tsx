'use client'

import classNames from 'classnames'

export type TextButtonProps = {
  title: string
  disabled?: boolean
  loading?: boolean
  className?: string
  titleClassName?: string
  onClick?: () => void
}

export const TextButton = ({
  className,
  title,
  disabled,
  loading,
  titleClassName,
  onClick,
}: TextButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={() => onClick?.()}
      className={classNames(disabled && 'opacity-50', className)}
    >
      <p className={classNames('text-sm font-medium text-primary', titleClassName)}>{title}</p>
    </button>
  )
}
