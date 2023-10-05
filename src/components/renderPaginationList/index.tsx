'use client'

import { useQueryList } from '@/hooks'
import { QueryList, RenderFilterComponentParams, UseQueryListProps } from '@/types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { Empty, EmptyProps, Pagination, PaginationProps, Spinner } from '..'

export type RenderPaginationListProps<
  Data = any,
  Params extends QueryList = any,
  AdditionalParams = any,
> = UseQueryListProps<Data, Params, AdditionalParams> & {
  containerClassName?: string
  listClassName?: string
  filterClassName?: string
  className?: string
  showLoadingBy?: 'isFetching' | 'isLoading'
  paginationClassName?: string
  listContainerClassName?: string
  paginationProps?: Partial<Omit<PaginationProps, 'pageCount' | 'onPageChange'>>
  emptyProps?: EmptyProps
  renderItem: (data: Data, index: number) => JSX.Element
  renderFilterComponent?: (
    params: RenderFilterComponentParams<Data, Params, AdditionalParams>
  ) => JSX.Element
}

export const RenderPaginationList = <
  Data = any,
  Params extends QueryList = any,
  AdditionalParams = any,
>({
  renderItem,
  renderFilterComponent,
  showLoadingBy = 'isLoading',
  className,
  listClassName,
  filterClassName,
  containerClassName,
  paginationClassName,
  listContainerClassName,
  paginationProps,
  emptyProps,
  ...queryProps
}: RenderPaginationListProps<Data, Params, AdditionalParams>) => {
  const {
    data,
    isLoading,
    isFetching,
    additionalParams,
    pagination,
    params,
    pagination: { totalPage },
    paginate,
    filter,
  } = useQueryList<Data, Params, AdditionalParams>(queryProps)

  const loading = showLoadingBy === 'isFetching' ? isFetching : isLoading

  const getParams = () => {
    const { limit, offset, ...rest } = params
    return rest
  }

  return (
    <div className={twMerge(classNames('flex flex-1 flex-col', className))}>
      <div className={twMerge(classNames('flex-1', containerClassName))}>
        {renderFilterComponent ? (
          <div className={filterClassName}>
            {renderFilterComponent?.({
              data,
              pagination,
              additionalParams,
              isLoading: loading,
              params: getParams(),
              onChange: (params, additionalParams) => filter(params, additionalParams),
            })}
          </div>
        ) : null}

        <div className={twMerge(classNames('flex flex-1 flex-col', listContainerClassName))}>
          {loading ? (
            <div className="flex-center flex-1 bg-white">
              <Spinner />
            </div>
          ) : data?.length ? (
            <div className={listClassName}>
              {data.map((item, index) => renderItem(item, index))}
            </div>
          ) : (
            <div className="flex-center flex-1 bg-white">
              <Empty {...emptyProps} />
            </div>
          )}

          {data?.length ? (
            <div className={twMerge(classNames('mt-4 flex justify-center', paginationClassName))}>
              <Pagination
                {...paginationProps}
                pageCount={totalPage}
                onPageChange={(val) => paginate(val.selected + 1)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
