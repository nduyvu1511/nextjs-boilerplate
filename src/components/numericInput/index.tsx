'use client'

import classNames from 'classnames'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { twMerge } from 'tailwind-merge'
import { BaseInput, BaseInputProps } from '..'

export type NumerictInputProps = BaseInputProps &
  Omit<NumericFormatProps, 'min' | 'max'> & {
    min?: number
    max?: number
    selectOnFocus?: boolean
  }

export const NumerictInput = ({
  onSubmit,
  onChange,
  max,
  // base input props
  label,
  error,
  errorMsg,
  required,
  htmlFor,
  disabled,
  helperText,
  containerClassName,
  onReset,
  onClick,
  leftIcon,
  rightIcon,
  selectOnFocus,
  onLeftIconClick,
  onRightIconClick,
  //
  ...props
}: NumerictInputProps) => {
  const min = props?.min ?? (props.allowNegative ? -Infinity : 0)

  return (
    <BaseInput
      label={label}
      error={error}
      htmlFor={htmlFor}
      disabled={disabled}
      errorMsg={errorMsg}
      required={required}
      helperText={helperText}
      onClick={onClick}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onLeftIconClick={onLeftIconClick}
      onRightIconClick={onRightIconClick}
      containerClassName={containerClassName}
      onReset={props?.value && onReset ? onReset : undefined}
    >
      <NumericFormat
        thousandSeparator=","
        allowLeadingZeros={false}
        onKeyDown={
          onSubmit ? (e: any) => e.key === 'Enter' && onSubmit(e?.target?.value || '') : undefined
        }
        onFocus={selectOnFocus ? (e: any) => e.target?.select?.() : undefined}
        {...props}
        isAllowed={({ value, floatValue = 1, formattedValue }) => {
          if (value.charAt(0) === '0') {
            if (value.charAt(1) && value.charAt(1) !== '.') {
              return false
            }
          }
          if (max !== undefined && min !== undefined) {
            return formattedValue === '' || (floatValue >= min && floatValue <= max)
          }
          return true
        }}
        className={twMerge(
          classNames(
            'form-input',
            error && 'form-input-error',
            leftIcon && 'pl-[40px]',
            rightIcon && 'pr-[40px]',
            onReset && 'pr-[40px]',
            rightIcon && onReset && props.value && 'pr-[68px]',
            onClick && 'cursor-pointer',
            props.className
          )
        )}
      />
    </BaseInput>
  )
}
