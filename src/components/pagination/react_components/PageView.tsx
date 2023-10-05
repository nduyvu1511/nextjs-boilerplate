'use strict'

type Props = {
  pageSelectedHandler: (params: any) => any
  selected: boolean
  pageClassName?: string
  pageLinkClassName?: string
  activeClassName?: string
  activeLinkClassName?: string
  extraAriaContext?: string
  href?: string
  ariaLabel?: string
  page: number
  rel?: string
  pageLabelBuilder: (params: any) => any
}

const PageView = (props: Props) => {
  let { pageClassName, pageLinkClassName } = props
  const {
    page,
    selected,
    activeClassName,
    activeLinkClassName,
    pageSelectedHandler,
    href,
    extraAriaContext,
    pageLabelBuilder,
    rel,
  } = props

  let ariaLabel =
    props.ariaLabel || 'Page ' + page + (extraAriaContext ? ' ' + extraAriaContext : '')
  let ariaCurrent = null

  if (selected) {
    ariaCurrent = 'page'

    ariaLabel = props.ariaLabel || 'Page ' + page + ' is your current page'

    if (typeof pageClassName !== 'undefined') {
      pageClassName = pageClassName + ' ' + activeClassName
    } else {
      pageClassName = activeClassName
    }

    if (typeof pageLinkClassName !== 'undefined') {
      if (typeof activeLinkClassName !== 'undefined') {
        pageLinkClassName = pageLinkClassName + ' ' + activeLinkClassName
      }
    } else {
      pageLinkClassName = activeLinkClassName
    }
  }

  return (
    <li className={pageClassName}>
      {/* <a
        rel={rel}
        role={!href ? 'button' : undefined}
        className={pageLinkClassName}
        href={href}
        tabIndex={selected ? '-1' : '0'}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onClick={pageSelectedHandler}
      >
        {pageLabelBuilder(page)}
      </a> */}
    </li>
  )
}

export { PageView }
