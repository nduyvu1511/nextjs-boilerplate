'use client'

import { checkAnyKeyInObjectHasValue } from '@/utils'
import { PopupState, useCommonSlice } from '@/store'
import { Popup } from '..'

export function PopupGlobal() {
  const setPopupVisible = useCommonSlice((state) => state.setPopupVisible)
  const popup = useCommonSlice((state) => state.popup)

  return (
    <Popup
      visible={checkAnyKeyInObjectHasValue(popup)}
      overlayClosable={false}
      {...(popup as PopupState)}
      onCancel={setPopupVisible}
      onClose={setPopupVisible}
    />
  )
}
