import _ from 'lodash'
import { useEffect, useState } from 'react'

const useBreakpoint = () => {
  const [breakPoint, setBreakPoint] = useState(window.innerWidth)

  useEffect(() => {
    const calcInnerWidth = _.throttle(function () {
      setBreakPoint(window.innerWidth)
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return breakPoint
}

export { useBreakpoint }
