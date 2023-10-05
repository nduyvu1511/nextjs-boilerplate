'use client'

import { EyeDisableIcon, EyeIcon } from '@/assets'
import { useVisible } from '@/hooks'
import { TextInput, TextInputProps } from '..'

export type PasswordInputProps = Omit<TextInputProps, 'type'> & {}

export const PasswordInput = ({ ...props }: PasswordInputProps) => {
  const { toggle, visible } = useVisible()

  return (
    <TextInput
      {...props}
      type={visible ? 'text' : 'password'}
      onRightIconClick={toggle}
      rightIcon={visible ? EyeIcon : EyeDisableIcon}
    />
  )
}
