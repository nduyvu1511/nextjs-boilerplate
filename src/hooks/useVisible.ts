'use client'

import { useCallback, useState } from 'react'

export type UseVisible = {
  visible: boolean
  setVisible: (visible: boolean) => void
  onClose: () => void
  onOpen: () => void
  toggle: () => void
}

export const useVisible = (active = false): UseVisible => {
  const [visible, setVisible] = useState<boolean>(active)

  const onClose = useCallback(() => setVisible(false), [])
  const onOpen = useCallback(() => setVisible(true), [])
  const toggle = useCallback(() => setVisible((visible) => !visible), [])

  return {
    visible,
    setVisible,
    onClose,
    onOpen,
    toggle,
  }
}
