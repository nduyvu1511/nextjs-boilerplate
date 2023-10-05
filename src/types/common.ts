export type IconProps = {
  className?: string
  fill?: string
  size?: number
}

export type IdAndName<T extends string | number = number> = {
  id: T
  name: string
}

export type IdNameAndDesc<T extends string | number = number> = IdAndName<T> & {
  desc?: string
}

export type BaseFilterProps<Data = any, DefaultValue = Data> = {
  defaultValues?: DefaultValue
  onChange?: (data: Data) => void
  onClose?: () => void
}

export type Option<T extends string | number = string> = {
  label: string
  value: T
}

export type OptionAndDesc<T extends string | number = string> = Option<T> & {
  desc?: string
}

export type RadioButtonGroupItem<T extends string | number = string> = Option<T> & {
  desc?: string
  disabled?: boolean
}
