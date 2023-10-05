'use client'

import { Button, ButtonProps } from '../button'
import { Modal } from '../modal'
import { ModalProps } from '../modal/type'

export type PopupProps = Omit<ModalProps, 'title' | 'tabbarProps'> & {
  title?: string
  onConfirm?: () => void
  onCancel?: () => void
  description: string
  cancelButtonProps?: Partial<ButtonProps>
  confirmButtonProps?: Partial<ButtonProps>
}

export const Popup = ({
  title,
  description,
  cancelButtonProps,
  confirmButtonProps,
  onCancel: externalCancel,
  onConfirm,
  ...props
}: PopupProps) => {
  const onCancel = externalCancel || props?.onClose

  return (
    <Modal {...props} className="max-w-[400px]" childrenClassName="overflow-hidden p-[16px]">
      <div className="mb-[24px]">
        {title ? <h5 className="text-h5 mb-[16px]">{title}</h5> : null}
        <p className="text-16-medium">{description}</p>
      </div>
      <div className="flex items-center justify-end gap-[12px]">
        <Button
          title="Huỷ"
          className="bg-white border border-solid border-border01 py-[8px] rounded-[8px] hover:bg-transparent"
          titleClassName="text-[14px] text-text"
          onClick={onCancel}
          {...cancelButtonProps}
        />
        <Button
          title="Xác nhận"
          className="py-[8px] rounded-[8px]"
          titleClassName="text-[14px]"
          onClick={() => {
            if (onConfirm) {
              props?.onClose?.(), onConfirm?.()
            }
          }}
          {...confirmButtonProps}
        />
      </div>
    </Modal>
  )
}
