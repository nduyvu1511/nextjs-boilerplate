'use client'

import classNames from 'classnames'
import { Modal } from '..'
import { ModalProps } from '../modal/type'

export type DrawerProps = Omit<ModalProps, 'animation'> & {
  direction?: 'left' | 'right' | 'bottom' | 'top'
}

export const Drawer = ({ direction = 'left', ...props }: DrawerProps) => {
  return (
    <Modal
      duration={350}
      {...props}
      animation={
        direction === 'right'
          ? 'slideFromLeft'
          : direction === 'left'
          ? 'slideFromRight'
          : direction === 'bottom'
          ? 'slideFromBottom'
          : 'slideFromTop'
      }
      containerClassName={classNames(
        direction === 'left' && 'justify-start',
        direction === 'right' && 'justify-end',
        direction === 'bottom' && 'items-end',
        direction === 'top' && 'items-start',
        props.containerClassName
      )}
      className={classNames(
        (direction === 'left' || direction === 'right') &&
          'h-screen max-h-screen rounded-none w-full max-w-[380px]',
        (direction === 'bottom' || direction === 'top') && 'w-screen max-w-[100vw] rounded-none ',
        props.className
      )}
    />
  )
}
