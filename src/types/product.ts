import { QueryList } from '.'

export type ProductModel = {
  category_id: { category_id: number; category_name: string }
  product_tmpl_id: number
  product_name: string
  seller_price: number
  product_code: string
  barcode: string
  representation_image: { image_id: number; image_url: string }
  price_unit: number
  origin_price_unit: number
  standard_price: number
  uom_id: {
    uom_full_standard_name: string
    uom_id: number
    uom_name: string
    factor: number
  }
  uom_po_id: {
    uom_full_standard_name: string
    uom_id: number
    uom_name: string
    factor: number
  }
  sold_quantity: number
  stock_quantity: any
  attribute_ids: any[]
  create_date: string
  icon_cloud_storage_id: {
    id: number
    url: string
    image_url: string
    name: string
    image_model: string
  }
  uom_ids: {
    uom_full_standard_name: string
    uom_id: number
    uom_name: string
    factor: number
  }[]
}

export type BaseSortBy =
  | 'create_date_increase'
  | 'create_date_decrease'
  | 'name_increase'
  | 'name_decrease'

export type GetProductListReq = QueryList & {
  sort_by?: BaseSortBy
  keyword?: string
  category_id?: number
}

export type GetCategoryListReq = QueryList & {
  sort_by?: BaseSortBy
  first_category?: boolean
  category_name?: string
  parent_category_id?: number
}

export type Category = {
  category_id: number
  category_name: string
  parent_id: any
  child_ids?: any[]
  icon?: any
  category_complete_name: string
  category_icon?: any
}
