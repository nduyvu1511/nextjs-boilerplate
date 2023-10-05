import { useClickOutside, useVisible } from '@/hooks'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { PopoverContent } from './content'

export type PopoverProps = {
  placement?: 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter'
  trigger?: 'click' | 'hover'
  zIndex?: number
  content?: ReactNode
  children?: ReactNode
  arrowClassName?: string
  contentClassName?: string
  containerClassName?: string
}

export const Popover = ({
  content,
  children,
  trigger = 'hover',
  placement = 'topCenter',
  zIndex = 1000,
  arrowClassName,
  contentClassName,
  containerClassName,
}: PopoverProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { onClose, onOpen, visible } = useVisible()

  useClickOutside([containerRef], onClose)

  return (
    <div className={twMerge(classNames('inline-block', containerClassName))}>
      <div
        ref={containerRef}
        style={{ zIndex: visible ? zIndex : undefined }}
        className="relative"
        onMouseEnter={trigger === 'hover' ? onOpen : undefined}
        onMouseLeave={trigger === 'hover' ? onClose : undefined}
      >
        <AnimatePresence>
          {visible ? (
            <motion.div
              key="popover-content"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  opacity: 1,
                  scale: placement.includes('top') ? 1 : undefined,
                  transition: { when: 'beforeChildren', duration: 0.15 },
                },
                hidden: {
                  opacity: 0,
                  scale: placement.includes('top') ? 0.9 : undefined,
                  transition: { when: 'afterChildren', duration: 0.15 },
                },
              }}
            >
              <PopoverContent
                placement={placement}
                content={content}
                arrowClassName={arrowClassName}
                contentClassName={contentClassName}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div onClick={trigger === 'click' ? onOpen : undefined} className="cursor-default">
          {children}
        </div>
      </div>
    </div>
  )
}
