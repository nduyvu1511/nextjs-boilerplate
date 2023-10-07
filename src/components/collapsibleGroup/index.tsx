import { ArrowRightIcon } from '@/assets'
import { Colors } from '@/constants'
import classNames from 'classnames'
import { produce } from 'immer'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Collapsible, CollapsibleProps } from '..'

type CollapsibleGroupOption = Pick<
  CollapsibleProps,
  | 'content'
  | 'containerClassName'
  | 'contentClassName'
  | 'duration'
  | 'triggerClassName'
  | 'triggerTitleClassName'
  | 'triggerIconProps'
> &
  Partial<Pick<CollapsibleProps, 'renderTrigger'>> & {
    title: string
  }

export type CollapsibleGroupProps = {
  className?: string
  options: CollapsibleGroupOption[]
  allowExpandMultiple?: boolean // Nếu là true, sẽ cho phép mở nhiều collapse item cùng 1 lúc, mặc định sẽ chỉ mở được 1
}

export const CollapsibleGroup = ({
  options,
  className,
  allowExpandMultiple = true,
}: CollapsibleGroupProps) => {
  const [idsVisible, setIdsVisible] = useState<number[]>([])

  const handleSetVisible = (id: number) => {
    if (allowExpandMultiple) {
      setIdsVisible((prev) =>
        produce(prev, (draft) => {
          const index = draft.findIndex((_id) => _id === id)
          if (index !== -1) {
            draft.splice(index, 1)
          } else {
            draft.push(id)
          }
        })
      )
    } else {
      setIdsVisible([id])
    }
  }

  return (
    <div
      className={twMerge(
        'overflow-hidden rounded-[8px] border border-solid border-gray20',
        className
      )}
    >
      {options.map((item, index) => {
        const visible = idsVisible.includes(index)

        return (
          <Collapsible
            key={index}
            visible={visible}
            content={item.content}
            contentClassName={item.contentClassName}
            containerClassName={classNames(
              'border-b border-solid border-gray20 last:border-none',
              item.containerClassName
            )}
            renderTrigger={
              item?.renderTrigger
                ? item.renderTrigger
                : ({ visible }) => (
                    <div
                      onClick={() => handleSetVisible(index)}
                      className={classNames(
                        'flex items-center bg-gray10 p-[12px]',
                        item.triggerClassName
                      )}
                    >
                      <span
                        className={classNames(
                          'mr-[8px] transform transition-all duration-300',
                          visible && 'rotate-[90deg]'
                        )}
                      >
                        <ArrowRightIcon fill={Colors.gray80} size={24} {...item.triggerIconProps} />
                      </span>
                      <span className={item.triggerTitleClassName}>{item.title}</span>
                    </div>
                  )
            }
          />
        )
      })}
    </div>
  )
}

/*
  Example usage: 
  <CollapsibleGroup
    options={[
      {
        key: 1,
        title: 'This is title from group 1',
        content: (
          <div className="p-[12px]">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it
            can be found as a welcome guest in many households across the world.{' '}
          </div>
        ),
      },
      {
        key: 2,
        title: 'This is title from group 2',
        content: (
          <div className="p-[12px]">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it
            can be found as a welcome guest in many households across the world.{' '}
          </div>
        ),
      },
      {
        key: 3,
        title: 'This is title from group 3',
        content: (
          <div className="p-[12px]">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it
            can be found as a welcome guest in many households across the world.{' '}
          </div>
        ),
      },
    ]}
  />
*/
