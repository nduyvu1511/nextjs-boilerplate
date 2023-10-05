import { twMerge } from 'tailwind-merge'
import { Checkbox, CheckboxProps } from '../checkbox'
import classNames from 'classnames'

export type RadioProps = Omit<CheckboxProps, 'checkboxClassName'> & {
  radioClassName?: string
}

export const Radio = ({ radioClassName, size = 16, ...props }: RadioProps) => {
  return (
    <Checkbox
      checkboxClassName={twMerge(classNames(radioClassName, 'rounded-full'))}
      renderActiveIcon={() => (
        <span
          style={{ width: size / 2.6, height: size / 2.6 }}
          className="rounded-full bg-white"
        ></span>
      )}
      size={size}
      {...props}
    />
  )
}
