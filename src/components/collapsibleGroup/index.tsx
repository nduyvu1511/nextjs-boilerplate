import { ArrowDownIcon } from '@/assets'
import { Colors } from '@/constants'
import { UseVisible, useVisible } from '@/hooks'
import { IconProps } from '@/types'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, forwardRef, useImperativeHandle } from 'react'
import { twMerge } from 'tailwind-merge'

export type CollapsibleProps = {
  content: ReactNode
  duration?: number // ms unit
  children?: ReactNode // Nếu truyền thì phải toggle thông qua ref
  triggerTitle?: boolean
  triggerClassName?: string
  contentClassName?: string
  containerClassName?: string
  triggerTitleClassName?: string
  triggerIconProps?: IconProps
}

export type CollapsibleForwardRef = Pick<UseVisible, 'onClose' | 'onOpen' | 'toggle'>

export const Collapsible = forwardRef<CollapsibleForwardRef, CollapsibleProps>(function Child(
  {
    content,
    children,
    duration = 200,
    triggerTitle = 'Xem thêm',
    triggerClassName,
    contentClassName,
    triggerIconProps,
    containerClassName,
    triggerTitleClassName,
  },
  ref
) {
  const { onClose, onOpen, toggle, visible } = useVisible(true)

  useImperativeHandle(
    ref,
    () => ({
      onClose,
      onOpen,
      toggle,
    }),
    [onClose, onOpen, toggle]
  )

  return (
    <div className={containerClassName}>
      {children ?? (
        <button onClick={toggle} className={twMerge('flex items-center', triggerClassName)}>
          <span className={twMerge('text-14-medium', triggerTitleClassName)}>{triggerTitle} </span>
          <span
            className={classNames(
              'transform transition-all duration-300',
              visible && 'rotate-[180deg]'
            )}
          >
            <ArrowDownIcon fill={Colors.gray80} size={20} {...triggerIconProps} />
          </span>
        </button>
      )}

      <AnimatePresence>
        {visible ? (
          <motion.div
            key="collapsible-content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={twMerge('overflow-hidden', contentClassName)}
            variants={{
              visible: {
                opacity: 1,
                height: 'auto',
                transition: { when: 'beforeChildren', duration: duration / 1000 },
              },
              hidden: {
                opacity: 0,
                height: 0,
                transition: { when: 'afterChildren', duration: duration / 1000 },
              },
            }}
          >
            {content}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
})
