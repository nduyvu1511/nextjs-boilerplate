import { checkAnyKeyInObjectHasValue } from '@/utils'
import { useCommonSlice } from '@/store'
import { AsyncHandlerConfigPopupParams, UseAsyncParams } from '@/types'
import { MutateOptions, useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

/*
Kế thừa từ useMutation của react query, thêm 1 số tính năng để tiện cho việc coding, vẫn giữ nguyên giá trị trả về, options mặc định
 - setup sẵn thông báo cho trường hợp thành công, thất bại
 - nếu truyền showBackdrop (mặc định là true), sẽ tự động thêm loading cho toàn màn hình cho request ở trạng thái pending
 - Hiển thị popup confirm trước khi thực hiện 1 request qua params: popupParams
*/
export const useAsync = <Params = any, Response = any>({
  onMissingToken,
  fetcher,
  config,
  ...requestOptions
}: UseAsyncParams<Params, Response>) => {
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const setPopupVisible = useCommonSlice((state) => state.setPopupVisible)

  useEffect(() => {
    return () => {
      setBackdropVisible(false)
      setPopupVisible()
    }
  }, [setBackdropVisible, setPopupVisible])

  const result = useMutation<Response, any, Params, any>({
    mutationFn: async (params) => {
      const method = config?.method || 'POST'
      const {
        errorMsg = 'Có lỗi xảy ra, vui lòng thử lại sau',
        successMsg = 'Thành công',
        showBackdrop = method === 'POST',
        showErrorMsg = method === 'POST',
        showSuccessMsg = method === 'POST',
        requiredToken = true,
        shouldNavigateToLoginIfNoTokenFound,
        messageOptions,
      } = config || {}

      //   if (requiredToken && !token) {
      //     onMissingToken
      //       ? onMissingToken()
      //       : shouldNavigateToLoginIfNoTokenFound
      //       ? navigationRef?.navigate?.(Tabs.AuthTab, { screen: Screen.Login })
      //       : showMessage({
      //           message: 'Vui lòng đăng nhập để tiếp tục',
      //           type: 'warning',
      //         })
      //     return
      //   }

      showBackdrop && setBackdropVisible(true)

      try {
        const res = await fetcher(params)

        if (res?.success) {
          showBackdrop && setBackdropVisible(false)
          showSuccessMsg && toast.success(successMsg, messageOptions)
          return res?.data
        } else {
          showBackdrop && setBackdropVisible(false)
          showErrorMsg && toast.error(res?.message || errorMsg, messageOptions)
          throw Error(res as any)
        }
      } catch (error: any) {
        showBackdrop && setBackdropVisible(false)
        showErrorMsg && toast.error(errorMsg, messageOptions)
        throw Error(error)
      }
    },
    ...requestOptions,
  })

  const mutateAsync = async (
    params: Params,
    funcOptions?: MutateOptions<Response, any, Params, any> & {
      popupParams?: AsyncHandlerConfigPopupParams
    }
  ) => {
    const { popupParams = config?.popupParams, ...options } = funcOptions || {}
    if (checkAnyKeyInObjectHasValue(popupParams)) {
      setPopupVisible({
        ...popupParams,
        description: popupParams?.description as string,
        onConfirm: async () => {
          return result.mutateAsync(params, options)
        },
      })
    } else {
      return result.mutateAsync(params, options)
    }
  }

  const mutate = async (
    params: Params,
    funcOptions?: MutateOptions<Response, any, Params, any> & {
      popupParams?: AsyncHandlerConfigPopupParams
    }
  ) => {
    const { popupParams = config?.popupParams, ...options } = funcOptions || {}
    if (checkAnyKeyInObjectHasValue(popupParams)) {
      setPopupVisible({
        ...popupParams,
        description: popupParams?.description as string,
        onConfirm: async () => {
          return result.mutate(params, options)
        },
      })
    } else {
      return result.mutate(params, options)
    }
  }

  return { ...result, mutate, mutateAsync }
}
