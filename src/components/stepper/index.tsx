import { TickIcon } from '@/assets'
import { Colors } from '@/constants'
import { IconProps } from '@/types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export type StepperOption = {
  icon?: (props: IconProps & { active?: boolean }) => JSX.Element
  onClick?: () => void
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  disabled?: boolean
}

export type StepperProps = {
  options: StepperOption[]
  current: number // step hiện tại, phải >= 1 và < options.length
  activeColor?: string
}

export const Stepper = ({ options, current, activeColor = Colors.active }: StepperProps) => {
  return (
    <div className="flex gap-[8px] sm:gap-[12px]">
      {options.map(
        (
          {
            title,
            description,
            disabled,
            icon: Icon,
            onClick,
            className,
            titleClassName,
            descriptionClassName,
          },
          index
        ) => {
          const active = index + 1 <= current

          return (
            <div
              key={index}
              className={twMerge(
                'flex flex-[1.3] flex-col last:flex-1 sm:flex-[1.5] sm:last:flex-1',
                className
              )}
            >
              <div className="flex items-center">
                <div
                  onClick={!disabled && onClick ? onClick : undefined}
                  className={classNames(
                    'flex-center flex flex-1 flex-col',
                    !active && disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {Icon ? (
                    <Icon
                      size={32}
                      className="h-[24px] w-[24px] md:h-[32px] md:w-[32px]"
                      fill={active ? activeColor : Colors.gray70}
                      active={active}
                    />
                  ) : (
                    <span
                      className={classNames(
                        'flex-center h-[24px] w-[24px] rounded-full bg-bg text-[12px] text-black md:h-[32px] md:w-[32px]',
                        active && 'bg-active25'
                      )}
                    >
                      {active ? (
                        <TickIcon
                          className="h-[16px] w-[16px] md:h-[24px] md:w-[24px]"
                          fill={Colors.active}
                        />
                      ) : (
                        index + 1
                      )}
                    </span>
                  )}

                  <span
                    style={{ color: active ? activeColor : Colors.gray80 }}
                    className={twMerge(
                      'mt-[8px] line-clamp-1 text-center text-[12px] font-medium leading-[14px] md:text-[14px] md:leading-[20px] lg:text-[15px] lg:leading-[22px]',
                      titleClassName
                    )}
                  >
                    {title}
                  </span>
                </div>

                {index < options?.length - 1 ? (
                  <div className="flex flex-[0.3] items-center sm:flex-[0.5]">
                    <div
                      style={{ backgroundColor: active ? activeColor : Colors.gray20 }}
                      className={classNames('h-[1px] w-full rounded-[4px]')}
                    ></div>
                  </div>
                ) : null}
              </div>

              {description ? (
                <p
                  className={twMerge(
                    'mt-[8px] text-[12px] font-normal leading-[16px] text-gray70 md:text-[14px] md:leading-[20px]',
                    descriptionClassName
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
          )
        }
      )}
    </div>
  )
}

/*
  Example usage: 
  without icon: 
   <Stepper
    current={2}
    options={[
      { title: 'Chọn ghế' },
      { title: 'Bắp nước' },
      { title: 'Thanh toán' },
      { title: 'Thông tin vé' },
    ]}
  />

  With icon:
   <Stepper
    current={2}
    options={[
      { title: 'Chọn ghế', icon: InvoiceIcon },
      {
        title: 'Bắp nước',
        icon: BagIcon,
      },
      {
        title: 'Thanh toán',
        icon: FinanceIcon,
      },
      { title: 'Thông tin vé', icon: InvoiceIcon },
    ]}
  />
*/
