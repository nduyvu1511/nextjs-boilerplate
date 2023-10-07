'use client'

import { BagIcon, FinanceIcon, InvoiceIcon } from '@/assets'
import { Stepper } from '@/components'

export default function Home() {
  return (
    <main className="flex-center container my-[24px] flex-1 flex-col bg-white">
      <div className="mx-auto mt-[24px] flex w-full max-w-[800px] flex-1 flex-col">
        <Stepper
          current={1}
          options={[
            { title: 'Chọn ghế', icon: InvoiceIcon },
            {
              title: 'Bắp nước',
              icon: BagIcon,
            },
            {
              title: 'Thanh toán',
              icon: FinanceIcon,
            },
            { title: 'Thông tin vé', icon: InvoiceIcon },
          ]}
        />
      </div>
    </main>
  )
}
