import { ArrowLeftIcon, ArrowRightIcon, MoreHorizontalIcon } from '@/assets'
import { IconButton } from '@/components'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface PaginationBoxViewProps {
  pageCount: number
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
  prevPageRel?: string
  nextPageRel?: string
  breakLabel?: string | React.ReactNode
  breakAriaLabels?: {
    forward: string
    backward: string
  }
  hrefAllControls?: boolean
  hrefBuilder?: (pageIndex: number, pageCount: number, selected: number) => string | undefined
  onPageChange?: (selectedItem: { selected: number }) => void
  onPageActive?: (selectedItem: { selected: number }) => void
  onClick?: (event: {
    index?: number
    selected: number
    nextSelectedPage?: number
    isPrevious?: boolean
    isNext?: boolean
    isBreak?: boolean
    isActive?: boolean
  }) => number | void | false
  initialPage?: number
  forcePage?: number
  disableInitialCallback?: boolean
  className?: string
  pageClassName?: string
  pageLinkClassName?: string
  pageLabelBuilder?: (page: number) => React.ReactNode
  activeClassName?: string
  activeLinkClassName?: string
  previousClassName?: string
  nextClassName?: string
  breakClassName?: string
  breakLinkClassName?: string
  extraAriaContext?: string
  ariaLabelBuilder?: (pageIndex: number, selected: boolean) => string
  eventListener?: string
  renderOnZeroPageCount?: (props: PaginationBoxViewProps) => React.ReactNode
  selectedPageRel?: string
}

const PaginationBoxView: React.FC<PaginationBoxViewProps> = ({
  pageRangeDisplayed = 4,
  marginPagesDisplayed = 3,
  activeClassName = 'selected',
  previousClassName = 'previous',
  prevPageRel = 'prev',
  nextClassName = 'next',
  nextPageRel = 'next',
  breakLabel = '...',
  breakAriaLabels = { forward: 'Jump forward', backward: 'Jump backward' },
  disableInitialCallback = false,
  pageLabelBuilder = (page) => page,
  eventListener = 'onClick',
  renderOnZeroPageCount = undefined,
  selectedPageRel = 'canonical',
  hrefAllControls = false,
  pageCount,
  hrefBuilder,
  onPageChange,
  onPageActive,
  onClick,
  initialPage,
  forcePage,
  className,
  pageClassName,
  pageLinkClassName,
  activeLinkClassName,
  breakClassName,
  breakLinkClassName,
  extraAriaContext,
  ariaLabelBuilder,
}) => {
  const [selected, setSelected] = useState<number>(
    initialPage !== undefined && forcePage !== undefined ? forcePage : initialPage || 0
  )

  useEffect(() => {
    // Call the callback with the initialPage item:
    if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
      callCallback(initialPage)
    }
  }, [])

  useEffect(() => {
    if (forcePage !== undefined && forcePage !== selected) {
      setSelected(forcePage)
    }
  }, [forcePage, pageCount])

  const handlePreviousPage = () => {
    const newSelected = selected > 0 ? selected - 1 : undefined
    handleClick(undefined, newSelected, { isPrevious: true })
  }

  const handleNextPage = () => {
    const newSelected = selected < pageCount - 1 ? selected + 1 : undefined
    handleClick(undefined, newSelected, { isNext: true })
  }

  const handlePageSelected = (index: number) => {
    if (selected === index) {
      callActiveCallback(index)
      handleClick(undefined, undefined, { isActive: true })
      return
    }

    handleClick(undefined, index)
  }

  const handlePageChange = (newSelected: number) => {
    if (selected === newSelected) {
      return
    }
    setSelected(newSelected)

    // Call the callback with the new selected item:
    callCallback(newSelected)
  }

  const getForwardJump = () => {
    const forwardJump = selected + pageRangeDisplayed
    return forwardJump >= pageCount ? pageCount - 1 : forwardJump
  }

  const getBackwardJump = () => {
    const backwardJump = selected - pageRangeDisplayed
    return backwardJump < 0 ? 0 : backwardJump
  }

  const handleClick = (
    index: number | undefined,
    nextSelectedPage: number | undefined,
    {
      isPrevious = false,
      isNext = false,
      isBreak = false,
      isActive = false,
    }: {
      isPrevious?: boolean
      isNext?: boolean
      isBreak?: boolean
      isActive?: boolean
    } = {}
  ) => {
    let newPage: any = nextSelectedPage

    if (onClick) {
      const onClickReturn = onClick({
        index,
        selected,
        nextSelectedPage,
        isPrevious,
        isNext,
        isBreak,
        isActive,
      })
      if (onClickReturn === false) {
        // We abort standard behavior and let the parent handle all behavior.
        return
      }
      if (Number.isInteger(onClickReturn)) {
        // We assume the parent wants to go to the returned page.
        newPage = onClickReturn
      }
    }

    if (newPage !== undefined) {
      handlePageChange(newPage)
    }
  }

  const handleBreakClick = (index: number) => {
    console.log({ index, selected })
    const newSelected = selected < index ? getForwardJump() : getBackwardJump()
    handleClick(index, newSelected, { isBreak: true })
  }

  const callCallback = (selectedItem: number) => {
    if (onPageChange) {
      onPageChange({ selected: selectedItem })
    }
  }

  const callActiveCallback = (selectedItem: number) => {
    if (onPageActive) {
      onPageActive({ selected: selectedItem })
    }
  }

  const getPageElement = (index: number) => {
    return (
      <li
        onClick={() => handlePageSelected(index)}
        className={twMerge(
          classNames(
            'min-w-[36px] h-[32px] mr-[8px] flex-center hover:bg-gray10 rounded-[4px] border-[1.5px] border-solid border-transparent text-[14px] font-medium leading-[20px] text-text cursor-pointer',
            selected === index && 'text-primary border-primary',
            pageClassName
          )
        )}
      >
        {index + 1}
      </li>
    )
  }

  const pagination = () => {
    const items: React.ReactNode[] = []

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(getPageElement(index))
      }
    } else {
      let leftSide = pageRangeDisplayed / 2
      let rightSide = pageRangeDisplayed - leftSide

      if (selected > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - selected
        leftSide = pageRangeDisplayed - rightSide
      } else if (selected < pageRangeDisplayed / 2) {
        leftSide = selected
        rightSide = pageRangeDisplayed - leftSide
      }

      let createPageView = (index: number) => getPageElement(index)
      let index: number
      let breakView

      const pagesBreaking: {
        type: 'page' | 'break'
        index: number
        display: React.ReactNode
      }[] = []

      for (index = 0; index < pageCount; index++) {
        const page = index + 1

        if (page <= marginPagesDisplayed) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          })
          continue
        }

        if (page > pageCount - marginPagesDisplayed) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          })
          continue
        }

        const adjustedRightSide =
          selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide

        if (index >= selected - leftSide && index <= selected + adjustedRightSide) {
          pagesBreaking.push({
            type: 'page',
            index,
            display: createPageView(index),
          })
          continue
        }

        if (
          breakLabel &&
          pagesBreaking.length > 0 &&
          pagesBreaking[pagesBreaking.length - 1].display !== breakView &&
          (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
        ) {
          breakView = (
            <li
              onClick={() => handleBreakClick(index)}
              className={twMerge(
                classNames(
                  'min-w-[36px] h-[32px] flex-center hover:bg-gray10 rounded-[4px] group cursor-pointer mr-[8px]',
                  breakLinkClassName
                )
              )}
            >
              <p className="hidden group-hover:block">
                {index < selected ? <ArrowLeftIcon /> : <ArrowRightIcon />}
              </p>
              <MoreHorizontalIcon className="group-hover:hidden" />
            </li>
          )
          pagesBreaking.push({ type: 'break', index, display: breakView })
        }
      }

      pagesBreaking.forEach((pageElement, i) => {
        let actualPageElement = pageElement

        if (pageElement.type === 'break' && (i === 0 || i === pagesBreaking.length - 1)) {
          // Remove a break on either end of the pagination block.
          // Since we don't use it to jump beyond the current visible range.
          return
        }

        if (pageCount > pageRangeDisplayed) {
          if (pageElement.type === 'break' && i < pagesBreaking.length - 1) {
            items.push(actualPageElement.display)
          } else if (pageCount <= pageRangeDisplayed * 2 + 2) {
            // Ellipsis logic
            if (actualPageElement.type === 'break' && i === pagesBreaking.length - 1) {
              items.push(actualPageElement.display)
            } else if (actualPageElement.type === 'page') {
              items.push(actualPageElement.display)
            }
          } else {
            if (i === pagesBreaking.length - 1 || i === 0) {
              if (actualPageElement.type === 'break') {
                items.push(actualPageElement.display)
              }
            } else {
              if (actualPageElement.type === 'break' && i !== pagesBreaking.length - 1 && i !== 0) {
                items.push(actualPageElement.display)
              } else {
                if (actualPageElement.index === selected) {
                  actualPageElement = {
                    ...actualPageElement,
                    display: getPageElement(actualPageElement.index),
                  }
                }
                items.push(actualPageElement.display)
              }
            }
          }
        } else {
          if (actualPageElement.type === 'page') {
            items.push(actualPageElement.display)
          }
        }
      })
    }

    return items
  }

  return (
    <ul className={twMerge(classNames('flex items-center', className))}>
      <IconButton
        size={36}
        onClick={handlePreviousPage}
        icon={ArrowLeftIcon}
        disabled={selected === 0}
        className={twMerge(classNames(previousClassName))}
      />

      {pagination()}

      <IconButton
        size={36}
        onClick={handleNextPage}
        icon={ArrowRightIcon}
        disabled={selected === pageCount - 1}
        className={twMerge(classNames(nextClassName))}
      />
    </ul>
  )
}

export { PaginationBoxView }
