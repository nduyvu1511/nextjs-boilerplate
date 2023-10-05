'use client'

import { CloseIcon } from '@/assets'
import { IconProps } from '@/types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { IconButton } from '..'

export type TabbarProps = {
  title?: string
  className?: string
  leftIcon?: (props: IconProps) => JSX.Element
  rightIcon?: (props: IconProps) => JSX.Element
  onLeftClick?: () => void
  onRightClick?: () => void
}

export const Tabbar = ({
  title,
  className,
  onLeftClick,
  onRightClick,
  leftIcon,
  rightIcon = () => <CloseIcon className="h-[24px] w-[24px]" />,
}: TabbarProps) => {
  return (
    <div
      className={twMerge(
        classNames(
          'flex h-tabbarMobile items-center justify-between px-[12px] md:h-tabbarDesktop',
          className
        )
      )}
    >
      <div className="flex w-[40px] justify-start">
        {leftIcon ? <IconButton size={36} onClick={onLeftClick} icon={leftIcon} /> : null}
      </div>
      <p className="text-16-semibold md:text-18-semibold line-clamp-1 flex-1 text-center">
        {title}
      </p>
      <div className="flex w-[40px] justify-end">
        <IconButton size={36} onClick={onRightClick} icon={rightIcon} />
      </div>
    </div>
  )
}
