import _ from 'lodash'
import { useEffect } from 'react'

// Hook này sẽ trigger callback nếu thời gian user không tương tác với website(inactivityDuration) đến hạn
export const useInactivityTimer = (
  callback: () => void,
  inactivityDuration = 1000 * 60 * 30
) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(callback, inactivityDuration)
    }

    resetTimer()

    const events = ['mousemove', 'keypress', 'scroll', 'focus']
    events.forEach((event) => {
      window.addEventListener(event, _.throttle(resetTimer, 1000))
    })

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
      clearTimeout(timeout)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
