'use client'

/* eslint-disable react/no-unescaped-entities */
import { Colors } from '@/constants'
import { Option } from '@/types'
import { useRef } from 'react'
import Select, { Props, defaultTheme } from 'react-select'
import { BaseInput, BaseInputProps } from '../baseInput'

export type InputSelectProps<
  Value extends string | number = string,
  IsMulti extends boolean = false,
> = Omit<Props<Option<Value>, IsMulti>, 'options'> &
  BaseInputProps & {
    isMulti?: IsMulti
    options: Option<Value>[]
  }

export const InputSelect = <
  Value extends string | number = string,
  IsMulti extends boolean = false,
>({
  label,
  error,
  errorMsg,
  required,
  options,
  disabled,
  components,
  helperText,
  maxMenuHeight = 450,
  containerClassName,
  ...props
}: InputSelectProps<Value, IsMulti>) => {
  const ref = useRef<any>(null)

  return (
    <BaseInput
      label={label}
      error={error}
      errorMsg={errorMsg}
      required={required}
      disabled={disabled}
      containerClassName={containerClassName}
      helperText={helperText}
      onLabelClick={() => {
        ref.current?.openMenu?.()
      }}
    >
      <Select
        ref={ref}
        required
        autoFocus={false}
        maxMenuHeight={maxMenuHeight}
        classNames={{
          container: () => 'flex-1',
          control: () => 'form-input pr-[4px]',
          valueContainer: () => '!px-0 !py-0',
          input: () => '!m-0 !p-0',
        }}
        theme={{
          colors: {
            ...defaultTheme.colors,
            primary: Colors.active,
            primary25: Colors.active25,
            primary50: Colors.active50,
            danger: Colors.danger,
          },
          borderRadius: 5,
          spacing: defaultTheme.spacing,
        }}
        loadingMessage={() => <p className="text-15-normal py-[12px] text-gray70">Đang tải...</p>}
        noOptionsMessage={({ inputValue }) => (
          <p className="text-15-normal py-[12px] text-gray70">
            Không có dữ liệu nào
            {inputValue ? (
              <span>
                {' '}
                cho <span className="font-medium text-text">"{inputValue}"</span>
              </span>
            ) : (
              ''
            )}
          </p>
        )}
        styles={
          error
            ? {
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: Colors.danger,
                  borderWidth: 1.5,
                }),
              }
            : undefined
        }
        closeMenuOnSelect={!props.isMulti}
        options={options}
        components={{
          IndicatorSeparator: null,
          ...components,
        }}
        {...props}
      />
    </BaseInput>
  )
}
