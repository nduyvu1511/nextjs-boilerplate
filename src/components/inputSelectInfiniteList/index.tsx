'use client'

import { useQueryList } from '@/hooks'
import { Option, QueryList, QueryListOptions, UseQueryListProps } from '@/types'
import _ from 'lodash'
import { InputSelect, InputSelectProps } from '..'

export type InputSelectInfiniteListProps<
  Value extends string | number = string,
  IsMulti extends boolean = false,
  Data = any,
  Params extends QueryList = any,
> = Omit<InputSelectProps<Value, IsMulti>, 'options' | 'getItem' | 'onInputChange'> &
  Omit<UseQueryListProps<Data, Params>, 'options'> & {
    fetcherOptions?: QueryListOptions<Data>
    searchField?: keyof Params // là key để search, truyền lên API
    searchDelay?: number
    getItem: (item: Data) => Option<Value>
  }

export const InputSelectInfiniteList = <
  Value extends string | number = number,
  IsMulti extends boolean = false,
  Data = any,
  Params extends QueryList = any,
>({
  fetcher,
  getItem,
  filterCallback,
  fetcherCallback,
  getRefreshParams,
  mutateFetcherResponse,
  searchField = 'keyword' as keyof Params,
  queryKey,
  searchDelay = 500,
  initialParams,
  initialAdditionalParams,
  ...props
}: InputSelectInfiniteListProps<Value, IsMulti, Data, Params>) => {
  const { data, hasMore, isFetching, fetchMore, filter } = useQueryList<Data, Params>({
    fetcher,
    fetcherCallback,
    queryKey,
    initialParams: { limit: 16, ...((initialParams || {}) as Params) },
    initialAdditionalParams,
    mutateFetcherResponse,
    filterCallback,
    getRefreshParams,
  })

  return (
    <InputSelect<Value, IsMulti>
      options={(data?.length ? data.map((item) => getItem(item)) : []) as Option<Value>[]}
      isLoading={isFetching}
      onInputChange={_.debounce((value) => {
        filter({ [searchField]: value } as Params)
      }, searchDelay)}
      onMenuScrollToBottom={() => hasMore && fetchMore()}
      {...props}
    />
  )
}
