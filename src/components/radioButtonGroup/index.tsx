'use client'

import { RadioButtonGroupItem } from '@/types'
import { Draft, produce } from 'immer'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { BaseInput, BaseInputProps } from '..'
import { Checkbox } from '../checkbox'
import { Radio } from '../radio'

type RadioButtonGroupType = 'radio' | 'checkbox'

export type RadioButtonGroupItemProps = {
  onClick?: () => void
  active: boolean
}

export type RadioButtonGroupProps<
  Type extends RadioButtonGroupType,
  Value extends string | number = string,
> = BaseInputProps & {
  type?: Type
  value?: Type extends 'radio' ? Value : Value[]
  defaultValue?: Type extends 'radio' ? Value : Value[]
  options: readonly RadioButtonGroupItem<Value>[] | RadioButtonGroupItem<Value>[]
  onChange?: (value: Type extends 'radio' ? Value : Value[]) => void
  renderItem?: (props: RadioButtonGroupItemProps) => void
}

/*
  Generic Value nếu ko truyền sẽ mặc định là string, truyền thì value của option sẽ là kiểu của Value (generic của typescript)
  Type sẽ có 2 kiêu: radio hoặc checkbox:
    radio thì value, default value, onChange sẽ là kiểu dựa trên Value
    checkbox thì value, default value, onChange sẽ là kiểu dựa trên Value (Array<Value>)
  eg: Value Kiểu là string, type là radio thì: value sẽ là string.
      Value Kiểu là string, type là checkbox thì: value sẽ là string[],
 */
export const RadioButtonGroup = <
  Type extends RadioButtonGroupType = 'radio',
  Value extends string | number = string,
>({
  onChange,
  options,
  defaultValue,
  value: externalValue,
  // base input props
  label,
  error,
  errorMsg,
  required,
  htmlFor,
  disabled,
  helperText,
  containerClassName,
  ...props
}: RadioButtonGroupProps<Type, Value>) => {
  const type = props?.type ?? 'radio'
  const [value, setValue] = useState<Value | Value[] | undefined>(defaultValue)

  useEffect(() => {
    externalValue !== value && setValue(externalValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue])

  const handleChange = (val: Value) => {
    if (type === 'checkbox') {
      const newValue = produce((value as Value[]) || [], (draft) => {
        const index = draft.findIndex((item) => item === val)
        if (index === -1) {
          draft.push(val as Draft<Value>)
        } else {
          draft.splice(index, 1)
        }
      })
      setValue(newValue)
      onChange?.(newValue as Type extends 'radio' ? Value : Value[])
    } else {
      if (val !== value) {
        setValue(val)
        onChange?.(val as Type extends 'radio' ? Value : Value[])
      }
    }
  }

  return (
    <BaseInput
      label={label}
      error={error}
      htmlFor={htmlFor}
      disabled={disabled}
      errorMsg={errorMsg}
      required={required}
      helperText={helperText}
      containerClassName={containerClassName}
    >
      {options.map((item) => {
        const active =
          _.isArray(value) && value?.length ? value.includes(item.value) : item.value === value

        return type === 'checkbox' ? (
          <Checkbox
            key={item.value}
            active={active}
            label={item.label}
            className="mr-[16px]"
            disabled={item?.disabled}
            onClick={() => handleChange?.(item.value)}
          />
        ) : (
          <Radio
            key={item.value}
            active={active}
            label={item.label}
            className="mr-[16px]"
            disabled={item?.disabled}
            onClick={() => handleChange?.(item.value)}
          />
        )
      })}
    </BaseInput>
  )
}
