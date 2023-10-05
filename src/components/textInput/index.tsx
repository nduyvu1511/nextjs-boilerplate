'use client'

import classNames from 'classnames'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseInput, BaseInputProps } from '..'

export type TextInputProps = BaseInputProps &
  Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onSubmit' | 'defaultValue' | 'value'
  > & {
    value?: string
    defaultValue?: string
    selectOnFocus?: boolean
    onChangeText?: (value: string) => void // là text
    onSubmit?: (value: string) => void // Bấm enter sẽ kích hoạt hàm này
  }

export const TextInput = ({
  // base input props
  label,
  error,
  errorMsg,
  required,
  htmlFor,
  disabled,
  helperText,
  containerClassName,
  leftIcon,
  rightIcon,
  onReset,
  onClick,
  onLeftIconClick,
  onRightIconClick,
  //
  selectOnFocus,
  onChangeText,
  onChange,
  onSubmit,
  ...props
}: TextInputProps) => {
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
      <input
        type="text"
        id={htmlFor}
        required={required}
        disabled={disabled}
        readOnly={!!onClick}
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
        onChange={(e) => {
          onChange?.(e), onChangeText?.(e.target.value)
        }}
        onKeyDown={
          onSubmit ? (e: any) => e.key === 'Enter' && onSubmit(e?.target?.value || '') : undefined
        }
        onFocus={selectOnFocus ? (e: any) => e.target?.select?.() : undefined}
        {...props}
      />
    </BaseInput>
  )
}
