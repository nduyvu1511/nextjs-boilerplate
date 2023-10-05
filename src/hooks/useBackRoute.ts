import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  cb: (as: string) => void
  shouldStay?: boolean
}

const useBackRoute = ({ cb, shouldStay = true }: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (shouldStay) {
        cb(url)
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
}

export { useBackRoute }
