import { TickIcon } from '@/assets'
import { Colors } from '@/constants'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type CheckboxProps = {
  active?: boolean
  label?: string
  className?: string
  disabled?: boolean
  size?: number
  labelClassName?: string
  checkboxClassName?: string
  onClick?: () => void
  renderActiveIcon?: () => ReactNode
}

export const Checkbox = ({
  active,
  className,
  label,
  disabled,
  size = 16,
  labelClassName,
  checkboxClassName,
  renderActiveIcon,
  onClick,
}: CheckboxProps) => {
  return (
    <div
      className={twMerge(
        classNames(
          'inline-flex items-center',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )
      )}
    >
      <span
        style={{ width: size, height: size }}
        onClick={!disabled ? () => onClick?.() : undefined}
        className={twMerge(
          classNames(
            'flex-center cursor-pointer rounded-[4px] border border-solid border-gray50 transition-all duration-200 hover:opacity-80',
            checkboxClassName,
            active && 'border-active bg-active',
            disabled && 'cursor-not-allowed border-gray30 bg-gray20 opacity-50'
          )
        )}
      >
        {renderActiveIcon ? (
          renderActiveIcon()
        ) : (
          <TickIcon
            fill={disabled ? Colors.gray30 : active ? Colors.white : Colors.white}
            size={40}
          />
        )}
      </span>

      <label
        onClick={!disabled ? () => onClick?.() : undefined}
        className={twMerge(
          classNames(
            'text-14-medium ml-[8px] flex-1 cursor-pointer',
            labelClassName,
            disabled && 'cursor-not-allowed opacity-50'
          )
        )}
      >
        {label}
      </label>
    </div>
  )
}
