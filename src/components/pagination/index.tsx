import React from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

export type PaginationProps = ReactPaginateProps & {}

export const Pagination = ({ ...props }: PaginationProps) => {
  return (
    <ReactPaginate
      {...props}
      className="flex"
      activeClassName="text-primary"
      nextClassName="text-primary ml-3"
      previousClassName="text-primary mr-3"
      breakClassName="mx-2"
      pageClassName="mx-2"
    />
  )
}
