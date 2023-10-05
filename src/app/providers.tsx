'use client'

import { BackdropGlobal, PopupGlobal } from '@/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { Toaster } from 'react-hot-toast'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false, retryOnMount: false },
      },
    })
  )

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BackdropGlobal />
      <PopupGlobal />
      <Toaster />
      {children}
    </QueryClientProvider>
  )
}

export default Providers
