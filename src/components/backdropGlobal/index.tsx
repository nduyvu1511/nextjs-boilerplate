'use client'

import { useCommonSlice } from '@/store'
import { Backdrop } from '..'

export const BackdropGlobal = () => {
  const backdropVisible = useCommonSlice((state) => state.backdropVisible)

  return <Backdrop visible={backdropVisible} />
}
