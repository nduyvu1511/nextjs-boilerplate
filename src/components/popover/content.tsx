import classNames from 'classnames'
import { useLayoutEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { PopoverProps } from '.'

export const PopoverContent = ({
  content,
  placement = 'topCenter',
  arrowClassName,
  contentClassName,
}: Pick<PopoverProps, 'content' | 'placement' | 'contentClassName' | 'arrowClassName'>) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef?.current?.offsetHeight || 0)
    }
  }, [])

  return (
    <div
      ref={contentRef}
      style={placement.includes('top') ? { top: -(height + 12) } : { bottom: -(height + 12) }}
      className={classNames(
        twMerge(
          'absolute w-max rounded-[8px] bg-white p-[12px] shadow-shadow1',
          Position?.[placement],
          contentClassName
        )
      )}
    >
      <div
        className={twMerge(
          classNames(
            'absolute h-0 w-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent',
            placement.includes('top')
              ? '-bottom-[7px] border-t-[7px] border-t-white'
              : '-top-[7px] border-b-[7px] border-b-white',
            Position?.[placement],
            arrowClassName
          )
        )}
      ></div>

      {content}
    </div>
  )
}

const Position = {
  topLeft: 'transform -translate-x-1/4 left-1/4',
  topRight: 'transform translate-x-1/4 right-1/4',
  topCenter: 'transform -translate-x-1/2 left-1/2',
  bottomLeft: 'transform -translate-x-1/4 left-1/4',
  bottomRight: 'transform translate-x-1/4 right-1/4',
  bottomCenter: 'transform -translate-x-1/2 left-1/2',
}
