import { CloseIcon, InfoIcon } from '@/assets'
import { Colors, DEFAULT_REQUIRED_MESSAGE } from '@/constants'
import { IconProps } from '@/types'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { IconButton, Tooltip } from '..'

export type BaseInputProps = {
  label?: string
  error?: boolean
  errorMsg?: string
  required?: boolean
  htmlFor?: string
  disabled?: boolean
  helperText?: string
  containerClassName?: string
  onClick?: () => void
  onReset?: () => void
  onLabelClick?: () => void
  leftIcon?: (props: IconProps) => JSX.Element
  rightIcon?: (props: IconProps) => JSX.Element
  onLeftIconClick?: () => void
  onRightIconClick?: () => void
}

export const BaseInput = ({
  label,
  error,
  htmlFor,
  errorMsg = DEFAULT_REQUIRED_MESSAGE,
  required,
  disabled,
  children,
  helperText,
  containerClassName,
  onClick,
  onReset,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  onLabelClick,
  onLeftIconClick,
  onRightIconClick,
}: BaseInputProps & { children: ReactNode }) => {
  return (
    <div
      className={classNames(
        'flex w-full flex-col',
        containerClassName,
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      {label ? (
        <label
          htmlFor={htmlFor}
          className={classNames(
            'input-label cursor-default select-none',
            helperText && 'flex items-center'
          )}
          onClick={() => onLabelClick?.()}
        >
          {helperText ? (
            <div className="mr-[8px]">
              <Tooltip
                trigger="hover"
                contentClassName="transform -translate-x-0 left-[-8px]"
                arrowClassName="transform-none left-[12px]"
                placement="topLeft"
                title={helperText}
              >
                <InfoIcon size={20} fill={Colors.gray70} />
              </Tooltip>
            </div>
          ) : null}

          {label}
          {required ? <span className="input-label-required ml-[2px]">*</span> : null}
        </label>
      ) : null}

      <div onClick={onClick} className="relative flex">
        {LeftIcon ? (
          <div
            onClick={onLeftIconClick}
            className="flex-center absolute left-0 top-0 h-inputHeight w-[40px]"
          >
            <LeftIcon size={20} fill={Colors.gray70} />
          </div>
        ) : null}

        {children}

        {onReset ? (
          <IconButton
            size={20}
            onClick={onReset}
            className={classNames(
              'absolute top-1/2 -translate-y-1/2 transform',
              RightIcon ? 'right-[40px]' : 'right-[12px]'
            )}
            icon={() => <CloseIcon size={20} fill={Colors.gray70} />}
          />
        ) : null}

        {RightIcon ? (
          <div
            onClick={onRightIconClick}
            className="flex-center absolute right-0 top-0 h-inputHeight w-[40px]"
          >
            <RightIcon size={20} fill={Colors.gray70} />
          </div>
        ) : null}
      </div>

      {error ? <p className="input-error-text">{errorMsg}</p> : null}
    </div>
  )
}
