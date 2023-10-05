import { PopupProps } from '@/components'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type PopupState = Pick<
  PopupProps,
  'title' | 'description' | 'onConfirm' | 'cancelButtonProps' | 'confirmButtonProps'
>

type State = {
  backdropVisible: boolean
  setBackdropVisible: (visible: boolean) => void
  popup: PopupState | undefined
  setPopupVisible: (params?: PopupState | undefined) => void
  isUploadingImage: boolean
  setIsUploadingImage: (params: boolean) => void
}

export const useCommonSlice = create<
  State,
  [['zustand/devtools', never], ['zustand/immer', never]]
>(
  devtools(
    immer((set) => ({
      backdropVisible: false,
      isUploadingImage: false,
      newMessageInConversationAppend: undefined,
      popup: undefined,
      setBackdropVisible: (backdropVisible) =>
        set((state) => {
          state.backdropVisible = backdropVisible
        }),
      setPopupVisible: (params) =>
        set((state) => {
          state.popup = params
        }),
      setIsUploadingImage: (params) =>
        set((state) => {
          state.isUploadingImage = params
        }),
    }))
  )
)
