import { Variants } from 'framer-motion'
import { useMemo } from 'react'
import { ModalAnimationType } from './type'

export const useModalTransition = (duration = 300) => {
  const variants: { [key in ModalAnimationType]: Variants } = useMemo(() => {
    return {
      ['fade']: {
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
            delayChildren: duration / 1000,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
        },
      },
      ['slideDown']: {
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
          },
          marginBottom: 0,
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
          marginBottom: 120,
        },
      },
      ['slideUp']: {
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
          },
          marginTop: 0,
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
          marginTop: 120,
        },
      },
      ['slideFromLeft']: {
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
          },
          marginRight: '0',
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
          marginRight: '-100%',
        },
      },
      ['slideFromRight']: {
        visible: {
          opacity: 1,
          marginLeft: '0',
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
          marginLeft: '-100%',
        },
      },
      ['slideFromBottom']: {
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
          },
          marginBottom: '0',
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
          marginBottom: '-100%',
        },
      },
      ['slideFromTop']: {
        visible: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            duration: duration / 1000,
          },
          marginTop: '0',
        },
        hidden: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            duration: duration / 1000,
          },
          marginTop: '-100%',
        },
      },
    }
  }, [duration])

  return { variants }
}
