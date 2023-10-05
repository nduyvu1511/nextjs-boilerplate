/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { MinusIcon, PlusIcon } from '@/assets'
import { Colors } from '@/constants'
import classNames from 'classnames'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { IconButton } from '..'
import { twMerge } from 'tailwind-merge'

export type QuantityInputProps = {
  min?: number
  max?: number
  value?: number
  timer?: number // use for triggerOnChangeBy is debounce
  disabled?: boolean
  allowInput?: boolean
  selectOnFocus?: boolean
  triggerOnChangeBy?: 'none' | 'debounce'
  onChange?: (value: number) => void
  // custom styles
  btnSize?: number
  btnIconSize?: number
  inputClassName?: string
  btnClassName?: string
}

export const QuantityInput = ({
  onChange,
  disabled,
  timer = 500,
  btnSize = 36,
  btnIconSize = 18,
  btnClassName,
  max = Infinity,
  inputClassName,
  allowInput = true,
  selectOnFocus = true,
  value: externalValue,
  triggerOnChangeBy = 'none',
  ...props
}: QuantityInputProps) => {
  const min = props?.min ?? 1
  const [value, setValue] = useState<number>(externalValue ?? min)

  const checkIsValidValue = (value: number) => value >= min && value <= max

  useEffect(() => {
    if (externalValue !== undefined && checkIsValidValue(externalValue)) {
      setValue(externalValue)
    }
  }, [externalValue])

  const onChangeWithDebounce = useCallback(
    _.debounce((value: number) => {
      onChange?.(value)
    }, timer),
    [onChange]
  )

  const handleChange = (value: number) => {
    setValue(value)
    if (triggerOnChangeBy === 'debounce') {
      onChangeWithDebounce(value)
    } else if (triggerOnChangeBy === 'none') {
      onChange?.(value)
    }
  }

  const minus = () => {
    const newValue = value - 1
    if (newValue >= min) {
      handleChange(newValue)
    }
  }

  const plus = () => {
    const newValue = value + 1
    if (newValue <= max) {
      handleChange(newValue)
    }
  }

  return (
    <div
      className={classNames(
        'inline-flex items-center justify-between',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <IconButton
        size={btnSize}
        icon={() => <MinusIcon size={btnIconSize} fill={Colors.gray80} />}
        onClick={value >= min ? minus : undefined}
        disabled={disabled || value <= min}
        className={classNames('border border-solid border-border01', btnClassName)}
      />
      <NumericFormat
        value={value}
        disabled={disabled}
        readOnly={disabled || !allowInput}
        thousandSeparator=","
        allowLeadingZeros={false}
        onValueChange={({ floatValue = min }) => handleChange(floatValue)}
        isAllowed={({ floatValue = 0, formattedValue, value }) => {
          if (value.charAt(0) === '0') {
            if (value.charAt(1) && value.charAt(1) !== '.') {
              return false
            }
          }
          return checkIsValidValue(floatValue)
        }}
        className={twMerge(
          classNames('text-15-medium h-full w-[40px] text-center outline-none', inputClassName)
        )}
        onFocus={selectOnFocus ? (e: any) => e.target?.select?.() : undefined}
      />
      <IconButton
        size={btnSize}
        icon={() => <PlusIcon size={btnIconSize} fill={Colors.gray80} />}
        onClick={value <= max ? plus : undefined}
        disabled={disabled || value >= max}
        className={classNames('border border-solid border-border01', btnClassName)}
      />
    </div>
  )
}
