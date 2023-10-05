import _ from 'lodash'
import { useEffect, useState } from 'react'

export const useScrollTop = () => {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    const getHeight = () => setHeight(document.documentElement.scrollTop)
    window.addEventListener('scroll', _.throttle(getHeight, 1000))

    return () => window.removeEventListener('scroll', _.throttle(getHeight, 1000))
  }, [])

  return height
}
