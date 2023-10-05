import classNames from 'classnames'
import { Popover, PopoverProps } from '..'

type TooltipProps = Omit<PopoverProps, 'content'> & {
  title: string
  titleClassName?: string
}

export const Tooltip = ({ title, titleClassName, contentClassName, ...props }: TooltipProps) => {
  return (
    <Popover
      contentClassName={classNames(
        'w-max min-w-[32px] min-h-[32px] px-[8px] py-[6px] max-w-[250px]',
        contentClassName
      )}
      content={title}
      {...props}
    />
  )
}
