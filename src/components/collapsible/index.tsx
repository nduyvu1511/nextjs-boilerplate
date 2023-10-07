import { ArrowRightIcon } from '@/assets'
import { Colors } from '@/constants'
import { UseVisible, useVisible } from '@/hooks'
import { IconProps } from '@/types'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, forwardRef, useEffect, useImperativeHandle } from 'react'
import { twMerge } from 'tailwind-merge'

export type RenderCollapsibleTriggerParams = {
  toggle: () => void
  visible: boolean
}

export type CollapsibleProps = {
  visible?: boolean // dành cho trường hợp muốn toggle thông qua state của cha
  content: ReactNode
  duration?: number // ms unit
  triggerTitle?: boolean
  triggerClassName?: string
  contentClassName?: string
  containerClassName?: string
  triggerTitleClassName?: string
  triggerIconProps?: IconProps
  renderTrigger?: (params: RenderCollapsibleTriggerParams) => ReactNode // customize render trigger nếu không muốn dùng mặc định
}

export type CollapsibleForwardRef = Pick<UseVisible, 'onClose' | 'onOpen' | 'toggle'>

export const Collapsible = forwardRef<CollapsibleForwardRef, CollapsibleProps>(function Child(
  {
    visible: externalVisible,
    content,
    renderTrigger,
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
  const { onClose, onOpen, toggle, setVisible, visible } = useVisible(false)

  useImperativeHandle(
    ref,
    () => ({
      onClose,
      onOpen,
      toggle,
    }),
    [onClose, onOpen, toggle]
  )

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible)
    }
  }, [externalVisible, setVisible])

  return (
    <div className={containerClassName}>
      {renderTrigger ? (
        renderTrigger({ toggle, visible })
      ) : (
        <button onClick={toggle} className={twMerge('flex items-center', triggerClassName)}>
          <span className={twMerge('text-14-medium', triggerTitleClassName)}>{triggerTitle} </span>
          <span
            className={classNames(
              'transform transition-all duration-300',
              visible && 'rotate-[90deg]'
            )}
          >
            <ArrowRightIcon fill={Colors.gray80} size={20} {...triggerIconProps} />
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
