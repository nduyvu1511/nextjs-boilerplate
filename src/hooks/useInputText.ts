import React, { useState } from 'react'

interface UseInputTextRes {
  value: string | undefined
  clearValue: () => void
  onChange: (value: string) => void
}

const useInputText = (defaultValue = ''): UseInputTextRes => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (value: string) => {
    setValue(value)
  }

  const clearValue = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    clearValue,
  }
}

export { useInputText }
