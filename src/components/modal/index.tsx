'use client'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { Tabbar } from '..'
import { useModalTransition } from './hook'
import { ReactPortal } from './portal'
import { ModalProps } from './type'

export function Modal({
  containerClassName,
  childrenClassName,
  className,
  children,
  visible,
  closeByEscape = true, // close by press Escape on keyboard
  duration = 300, // ms unit
  overlayClosable = true,
  animation = 'slideDown',
  overlayclassName,
  footer = null,
  tabbarProps,
  title,
  onClose,
}: ModalProps) {
  const { variants } = useModalTransition(duration)

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <AnimatePresence>
        {visible ? (
          <div
            className={twMerge(
              classNames('flex-center fixed inset-0 z-[10000]', containerClassName)
            )}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants[animation]}
              className={twMerge(
                classNames(
                  'z-10 flex max-h-[calc(100vh-80px)] w-[90%] max-w-[520px] flex-col rounded-default bg-white shadow-modal',
                  className
                )
              )}
            >
              {tabbarProps || title ? (
                <Tabbar
                  title={title}
                  onRightClick={onClose}
                  className="border-b border-solid border-black06"
                  {...tabbarProps}
                />
              ) : null}

              <div
                className={twMerge(
                  classNames('flex-1 overflow-y-auto p-[16px]', childrenClassName)
                )}
              >
                {children}
              </div>

              {footer}
            </motion.div>

            {/* Overlay */}
            <motion.div
              className={twMerge(
                classNames(
                  'absolute inset-0 bg-black40',
                  overlayClosable && 'cursor-pointer',
                  overlayclassName
                )
              )}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants['fade']}
              onClick={overlayClosable ? onClose : undefined}
            />

            <ModalChildren onClose={closeByEscape ? onClose : undefined} />
          </div>
        ) : null}
      </AnimatePresence>
    </ReactPortal>
  )
}

const ModalChildren = ({ onClose }: Pick<ModalProps, 'onClose'>) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    })

    return () => {
      document.documentElement.style.overflow = 'auto'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
