'use client'

import { SearchIcon } from '@/assets'
import { useInputText } from '@/hooks'
import { debounce } from 'lodash'
import { useCallback, useEffect } from 'react'
import { TextInput, TextInputProps } from '..'
import { convertViToEn } from '@/utils'

export type SearchInputProps = TextInputProps & {
  timer?: number // là thời gian debounce
  convertToEn?: boolean // Chuyển đầu ra của value qua onChangeText sang tiếng việt không dâu?
}

export const SearchInput = ({
  onChangeText, // là function được áp dụng hiệu ứng debounce với value là string
  onChange,
  timer = 500,
  convertToEn = false,
  value: externalValue, // để set 1 giá trị từ ngoài vào, truyền dạng string
  ...props
}: SearchInputProps) => {
  const { clearValue, onChange: setValue, value } = useInputText(externalValue as string)

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue])

  const handleChange = (value: string) => {
    onChangeText?.(convertToEn ? convertViToEn(value) : value)
  }

  const handleChangeDebounce = useCallback(debounce(handleChange, timer), [onChangeText])

  return (
    <TextInput
      leftIcon={SearchIcon}
      {...props}
      value={value}
      onChange={(e) => {
        const { value } = e.target
        setValue(value)
        handleChangeDebounce(value)
      }}
      onReset={() => {
        clearValue()
        handleChangeDebounce('')
      }}
    />
  )
}
