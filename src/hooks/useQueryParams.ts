import { QueryList } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useQueryParams = <Params extends QueryList = any>(
  cb?: (data: Params) => void
): Params => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const queryParams: Params = {} as Params

  for (const [key, value] of (params as any).entries()) {
    try {
      ;(queryParams as any)[key] = JSON.parse(value)
    } catch (error) {}
  }

  useEffect(() => {
    cb?.(queryParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return queryParams
}
