import { PopupState } from '@/store'
import { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { ToastOptions } from 'react-hot-toast'

export type QueryList = {
  limit?: number
  offset?: number
}

export interface Pagination {
  limit: number
  offset: number
  total: number
}

export type HTTPResponse<T> = {
  code: number
  success: boolean
  message: string
  validate_token: boolean
  data: T
}

export type HTTPListResponse<T> = {
  result: T
  paginate: Pagination
}

export type HTTPListResponsePromise<T> = Promise<HTTPResponse<HTTPListResponse<T>>>

export type HTTPResponsePromise<T> = Promise<HTTPResponse<T>>

export type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export type HTTPConfig = Partial<ToastOptions> & {
  showBackdrop?: boolean
  errorMsg?: string
  successMsg?: string
  showErrorMsg?: boolean
  showSuccessMsg?: boolean
  requiredToken?: boolean
  method?: HTTPMethod
  shouldNavigateToLoginIfNoTokenFound?: boolean
  shouldSetLoadingState?: boolean
}

export type AsyncHandlerFetcher<Params, Data> = (params: Params) => HTTPResponsePromise<Data>

export type UseAsyncParams<Params = any, Response = any> = Omit<
  UseMutationOptions<Response, any, Params, any>,
  'mutationFn'
> & {
  config?: AsyncHandlerConfig
  fetcher: AsyncHandlerFetcher<Params, Response>
  onMissingToken?: () => void
}

export type AsyncHandlerConfigPopupParams = Omit<PopupState, 'description'> &
  Required<Pick<PopupState, 'description'>>

export type AsyncHandlerConfig = {
  method?: HTTPMethod
  errorMsg?: string
  successMsg?: string
  showBackdrop?: boolean
  showErrorMsg?: boolean
  requiredToken?: boolean
  showSuccessMsg?: boolean
  messageOptions?: Partial<ToastOptions> // tuỳ chỉnh message toast
  shouldNavigateToLoginIfNoTokenFound?: boolean // tuỳ chọn đẩy qua trang login nếu ko có token
  popupParams?: AsyncHandlerConfigPopupParams // dùng để show popup confirm trước khi thực hiện 1 request
}

export type Fetcher<Params, Data> = (params: Params) => HTTPListResponsePromise<Data[]>

export type FetcherPartialParams<Params, Data> = (
  params: Partial<Params>
) => HTTPListResponsePromise<Data[]>

export type QueryListOptions<Data = any> = Partial<
  Omit<UseQueryOptions<HTTPListResponse<Data[]>, any>, 'queryKey' | 'queryFn'>
>

export interface UseQueryListProps<Data, Params extends QueryList = any, AdditionalParams = any> {
  queryKey: QueryKey
  options?: QueryListOptions<Data>
  initialParams?: Params
  initialAdditionalParams?: AdditionalParams
  fetcher: Fetcher<Params, Data> | FetcherPartialParams<Params, Data>
  mutateFetcherResponse?: (params: HTTPListResponse<Data[]>) => HTTPListResponse<Data[]>
  fetcherCallback?: () => void // only call once whenever fetcher resolved
  filterCallback?: () => void // only call once whenever filtered
  getRefreshParams?: (params?: Params) => Params
}

export type RenderFilterComponentParams<Data = any, Params = any, AdditionalParams = any> = {
  data: Data[]
  params?: Omit<Params, 'offset' | 'limit'> | undefined
  additionalData?: AdditionalParams
  pagination: Pagination
  isLoading: boolean
  additionalParams: AdditionalParams | undefined
  initialParams?: Params
  onChange: (params: Partial<Params>, additionalParams?: AdditionalParams) => void
}
