'use client'

import { useQueryList } from '@/hooks'
import { QueryList, RenderFilterComponentParams, UseQueryListProps } from '@/types'
import classNames from 'classnames'
import { ReactNode } from 'react'
import InfiniteScroll, { Props } from 'react-infinite-scroll-component'
import 'react-loading-skeleton/dist/skeleton.css'
import { twMerge } from 'tailwind-merge'
import { Empty, EmptyProps, Spinner } from '..'

export type RenderInfiniteListProps<
  Data = any,
  Params extends QueryList = any,
  AdditionalParams = any,
> = UseQueryListProps<Data, Params, AdditionalParams> &
  Partial<Omit<Props, 'next' | 'loader' | 'hasMore' | 'dataLength' | 'scrollableTarget'>> & {
    scrollableTarget?: string
    scrollableTargetClassName?: string

    loadingComponent?: ReactNode
    loadingMoreComponent?: ReactNode

    emptyProps?: EmptyProps
    listClassName?: string
    filterClassName?: string
    containerClassName?: string
    showLoadingBy?: 'isFetching' | 'isLoading'
    renderItem: (data: Data, index: number) => JSX.Element
    renderFilterComponent?: (
      params: RenderFilterComponentParams<Data, Params, AdditionalParams>
    ) => JSX.Element
  }

/*
  Đây là Component nhằm mục đính render infinite scroll list bằng fetcher, params, renderItem.

  Lưu ý: 
    nếu không truyền giá trị scrollableTarget, Component sẽ lấy window làm cha, hiệu ứng lướt xuống dưới sẽ tính bằng window. Nếu truyền giá trị scrollableTarget, Component sẽ lấy thẻ div làm cha, hiệu ứng lướt xuống dưới sẽ tính bằng height của thẻ div này, eg: scrollableTargetClassName="max-h-[500px] overflow-y-auto": sẽ có thể lướt trong vùng 500px, thay vì cả window.

    Đọc kỹ props trước khi sử dụng!
*/

export const RenderInfiniteList = <
  Data = any,
  Params extends QueryList = any,
  AdditionalParams = any,
>({
  renderItem,
  renderFilterComponent,
  emptyProps,
  showLoadingBy = 'isLoading',
  loadingComponent,
  loadingMoreComponent,
  listClassName,
  filterClassName,
  containerClassName,

  // useQuery Props
  options,
  queryKey,
  initialParams,
  initialAdditionalParams,
  fetcher,
  fetcherCallback,
  filterCallback,
  getRefreshParams,
  mutateFetcherResponse,

  // infinite component props
  scrollableTargetClassName,
  ...props
}: RenderInfiniteListProps<Data, Params, AdditionalParams>) => {
  const {
    data,
    params,
    hasMore,
    isLoading,
    pagination,
    isFetching,
    additionalParams,
    filter,
    refresh,
    fetchMore,
  } = useQueryList<Data, Params, AdditionalParams>({
    options,
    queryKey,
    initialParams,
    initialAdditionalParams,
    fetcher,
    fetcherCallback,
    filterCallback,
    getRefreshParams,
    mutateFetcherResponse,
  })

  const loading = showLoadingBy === 'isFetching' ? isFetching : isLoading

  const getParams = () => {
    const { limit, offset, ...rest } = params
    return rest
  }

  return (
    <div className={twMerge(classNames('flex flex-1 flex-col', containerClassName))}>
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

      {loading ? (
        <div className="flex flex-1 flex-col bg-white">
          {loadingComponent || <Spinner className="flex-center flex-1" />}
        </div>
      ) : !data?.length ? (
        <div className="flex-center flex-1 bg-white">
          <Empty {...emptyProps} />
        </div>
      ) : (
        <div id={props?.scrollableTarget} className={scrollableTargetClassName}>
          <InfiniteScroll
            pullDownToRefresh
            refreshFunction={refresh}
            dataLength={data?.length || 0}
            next={fetchMore}
            hasMore={hasMore}
            loader={
              hasMore ? loadingMoreComponent || <Spinner className="flex-center py-[16px]" /> : null
            }
            {...props}
          >
            <div className={listClassName}>
              {data.map((item, index) => renderItem(item, index))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  )
}

/*
  Example usage: 

  <RenderInfiniteList
    scrollableTarget="product-list"
    scrollableTargetClassName="max-h-[500px] overflow-y-auto"
    fetcher={productManageAPI.getProductList}
    queryKey={['products']}
    listClassName="flex flex-col gap-[12px]"
    loadingComponent={
      <SkeletonContainer className="flex flex-col gap-[12px]">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-[120px]" />
        ))}
      </SkeletonContainer>
    }
    renderItem={(item, index) => (
      <div
        className="flex-center h-[200px] rounded-[8px] bg-gray10"
        key={item.product_tmpl_id}
      >
        <p>{item.product_name}</p>
      </div>
    )}
  />
*/
