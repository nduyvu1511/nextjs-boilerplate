import { DEFAULT_LIMIT } from '@/constants'
import { removeEmptyValueFromObject } from '@/utils'
import { HTTPListResponse, HTTPResponse, QueryList, UseQueryListProps } from '@/types'
import { FetchQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type Options = Partial<Omit<FetchQueryOptions, 'queryKey' | 'queryFn'>>

export const useQueryList = <Data = any, Params extends QueryList = any, AdditionalParams = any>({
  queryKey,
  options,
  initialParams,
  initialAdditionalParams,
  fetcher,
  filterCallback,
  fetcherCallback,
  getRefreshParams,
  mutateFetcherResponse,
}: UseQueryListProps<Data, Params, AdditionalParams>) => {
  const queryClient = useQueryClient()
  const [params, setParams] = useState<Params>(getDefaultParams)
  const [additionalParams, setAdditionalParams] = useState<AdditionalParams | undefined>(
    initialAdditionalParams
  )

  const { isFetching, isLoading, data, error, refetch, ...queryProps } = useQuery<
    HTTPListResponse<Data[]>,
    Params
  >({
    cacheTime: Infinity,
    keepPreviousData: true,
    staleTime: 1000 * 60,
    retry: false,
    retryOnMount: false,
    ...options,
    queryKey,
    queryFn: () => {
      fetcherCallback?.()
      return fetcherHandler()
    },
  })

  function getDefaultParams() {
    return {
      limit: DEFAULT_LIMIT,
      offset: 0,
      ...initialParams,
    } as Params
  }

  const getDefaultResponse = (): HTTPListResponse<Data[]> => ({
    paginate: {
      limit: 0,
      offset: 0,
      total: 0,
    },
    result: [],
  })

  const getDataResponse = (
    res: HTTPResponse<HTTPListResponse<Data[]>>
  ): HTTPListResponse<Data[]> => {
    const response = res?.data || getDefaultResponse()
    if (mutateFetcherResponse) {
      return mutateFetcherResponse(res?.data)
    }
    return response
  }

  async function fetcherHandler(): Promise<HTTPListResponse<Data[]>> {
    try {
      const { limit, offset } = getDefaultParams()
      const newParams = { ...params, offset, limit } as Params
      const result = await fetcher(newParams)
      setParams(newParams)
      return getDataResponse(result)
    } catch (error) {
      console.log('FETCHER HANDLER IN USE QUERY ERROR: ', error)
      return getDefaultResponse()
    }
  }

  const refresh = () => {
    if (getRefreshParams) {
      const refreshParams = getRefreshParams?.(params)
      filter(refreshParams)
    } else {
      setParams(getDefaultParams())
      setAdditionalParams(initialAdditionalParams)
      refetch()
    }
  }

  const paginate = (page: number, options?: Options) => {
    queryClient.prefetchQuery({
      ...options,
      queryKey,
      queryFn: async () => {
        if (!data?.result?.length || isFetching) return

        try {
          const newParams = removeEmptyValueFromObject<Params>({
            ...params,
            offset: (page - 1) * data.paginate.limit,
            limit: data.paginate.limit,
          })
          setParams(newParams)
          const res = await fetcher(newParams)
          return getDataResponse(res)
        } catch (error) {
          console.log('PAGINATE IN USE QUERY ERROR: ', error)
          return getDefaultResponse()
        }
      },
    })
  }

  const fetchMore = (options?: Options) => {
    queryClient.prefetchQuery({
      ...options,
      queryKey,
      queryFn: async () => {
        if (!data?.result?.length || isFetching) return

        const { limit = DEFAULT_LIMIT, offset = 0 } = params || {}

        try {
          const newParams = removeEmptyValueFromObject<Params>({
            ...params,
            limit,
            offset: offset + limit,
          })
          setParams(newParams)
          const res = await fetcher(newParams)
          const result = getDataResponse(res)
          return {
            paginate: result.paginate,
            result: [...data.result, ...result.result],
          } as HTTPListResponse<Data[]>
        } catch (error) {
          console.log('FETCH MORE IN USE QUERY ERROR: ', error)
          return getDefaultResponse()
        }
      },
    })
  }

  const filter = async (
    funcParams: Partial<Params>,
    additionalParams?: AdditionalParams,
    options?: Options
  ) => {
    if (isFetching) return

    queryClient.prefetchQuery({
      ...options,
      queryKey,
      queryFn: async () => {
        try {
          const newParams = removeEmptyValueFromObject<Params>({
            ...params,
            limit: data?.paginate?.limit,
            offset: 0,
            ...funcParams,
          })
          additionalParams && setAdditionalParams(additionalParams)
          setParams(newParams)
          const res = await fetcher(newParams)
          filterCallback?.()
          return getDataResponse(res)
        } catch (error) {
          console.log('FILTER IN USE QUERY ERROR: ', error)
          return getDefaultResponse()
        }
      },
    })
  }

  const getPagination = () => {
    const { limit = DEFAULT_LIMIT, offset = 0, total = 0 } = data?.paginate || {}

    return {
      offset,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      page: Math.ceil(offset / (limit || 0)),
    }
  }

  return {
    ...queryProps,
    data: data?.result || [],
    pagination: getPagination(),
    isFetching,
    additionalParams,
    isLoading,
    error,
    params,
    hasMore: (data?.result?.length || 0) < (data?.paginate?.total || 0),
    filter,
    refresh,
    paginate,
    fetchMore,
  }
}
