import {
  Category,
  GetCategoryListReq,
  GetProductListReq,
  HTTPListResponsePromise,
  ProductModel,
} from '@/types'
import { axiosInstance } from './axiosInstance'

const productManageAPI = {
  getProductList: (params: GetProductListReq): HTTPListResponsePromise<ProductModel[]> => {
    return axiosInstance.get('/product_template_controller/list_product', {
      params,
    })
  },

  getCategoryList: (params: GetCategoryListReq): HTTPListResponsePromise<Category[]> => {
    return axiosInstance.get('/product_category_controller/list_category', {
      params,
    })
  },
}

export { productManageAPI }
