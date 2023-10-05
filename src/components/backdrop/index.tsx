'use client'

import React from 'react'
import { Modal, Spinner, SpinnerProps } from '..'
import { ModalProps } from '../modal/type'
import { Colors } from '@/constants'

export type BackdropProps = Pick<ModalProps, 'visible'> & SpinnerProps & {}

export const Backdrop = ({ visible }: BackdropProps) => {
  return (
    <Modal
      visible={visible}
      className="flex-center bg-transparent shadow-none"
      containerClassName="z-[999999999]"
      childrenClassName="overflow-hidden"
      overlayClosable={false}
    >
      <Spinner className="" size={32} fill={Colors.white} />
    </Modal>
  )
}
