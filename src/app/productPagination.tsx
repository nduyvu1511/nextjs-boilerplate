import { Image, RenderPaginationList } from '@/components'
import { QueryKeys } from '@/constants'
import { toImageUrl } from '@/utils'
import { productManageAPI } from '@/services'
import { ProductFilter } from './filter'

export const ProductPagination = () => {
  return (
    <RenderPaginationList
      fetcher={productManageAPI.getProductList}
      initialParams={{ limit: 24 }}
      queryKey={QueryKeys.products}
      containerClassName="flex-1 grid grid-cols-4 gap-[16px]"
      listClassName="grid grid-cols-5 gap-2"
      emptyProps={{ description: 'Không tìm thấy sản phẩm nào' }}
      filterClassName="sticky bg-white top-0 p-[16px] max-h-[100vh] flex flex-col"
      listContainerClassName="col-span-3"
      renderFilterComponent={({ onChange, params }) => (
        <ProductFilter defaultValues={params} onChange={onChange} />
      )}
      renderItem={(item) => (
        <div
          className="overflow-hidden rounded-[4px] border border-solid border-black10 bg-white"
          key={item.product_tmpl_id}
        >
          <div className="">
            <Image
              alt=""
              src={toImageUrl(item.representation_image?.image_url)}
              className="aspect-[1] object-contain"
            />
          </div>
          <div className="bg-white p-3">
            <p className="text-14-medium mb-3 line-clamp-2">{item.product_name}</p>
          </div>
        </div>
      )}
    />
  )
}
