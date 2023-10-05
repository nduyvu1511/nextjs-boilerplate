import { TabbarProps } from '..'

type ModalAnimationType =
  | 'fade'
  | 'slideDown'
  | 'slideUp'
  | 'slideFromLeft'
  | 'slideFromRight'
  | 'slideFromBottom'
  | 'slideFromTop'

type ModalProps = {
  className?: string
  containerClassName?: string
  overlayclassName?: string
  childrenClassName?: string
  visible: boolean
  children?: ReactNode
  duration?: number
  animation?: ModalAnimationType
  overlayClosable?: boolean
  footer?: JSX.Element | null
  title?: string
  tabbarProps?: TabbarProps
  closeByEscape?: boolean
  onClose?: () => void
}
