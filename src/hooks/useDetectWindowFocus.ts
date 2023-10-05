import { useEffect, useState } from 'react'

const useDetectWindowFocus = (): boolean => {
  const [isFocused, setIsFocused] = useState(true)

  useEffect(() => {
    const handleActivityFalse = () => {
      setIsFocused(false)
    }

    const handleActivityTrue = () => {
      setIsFocused(true)
    }

    window.addEventListener('focus', handleActivityTrue)
    window.addEventListener('blur', handleActivityFalse)

    return () => {
      window.removeEventListener('focus', handleActivityTrue)
      window.removeEventListener('blur', handleActivityFalse)
    }
  }, [isFocused])

  return isFocused
}

export { useDetectWindowFocus }
