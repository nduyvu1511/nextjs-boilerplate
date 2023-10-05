'use client'

import { Images } from '@/assets'
import { Button, Image, InputSelectInfiniteList } from '@/components'
import { useAsync } from '@/hooks'
import { productManageAPI } from '@/services'

export default function Home() {
  const { mutate } = useAsync({ fetcher: productManageAPI.getCategoryList })
  return (
    <main className="flex-center container my-[24px] flex-1 flex-col bg-white">
      <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col">
        {/* <div className="mt-[100px]">
          <br />
          <br />
          <Collapsible
            containerClassName="border rounded-[4px] border-solid border-gray20 p-[8px] border-b-0"
            contentClassName=""
            content={<div className="mt-[12px]">This is content of children</div>}
          />
          <Collapsible
            containerClassName="border rounded-[4px] border-solid border-gray20 p-[8px]"
            contentClassName=""
            content={<div className="mt-[12px]">This is content of children</div>}
          />
        </div> */}
        <Image src={Images.default} alt="" />
        <Button
          title="Call API"
          onClick={() => mutate({}, { popupParams: { title: 'tesdfdsf', description: 'sfsdf' } })}
        />
        <InputSelectInfiniteList
          fetcher={productManageAPI.getProductList}
          queryKey={['products']}
          getItem={(data) => ({ label: data.product_name, value: data.product_tmpl_id })}
        />
        {/* <RenderInfiniteList
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
        /> */}
      </div>
    </main>
  )
}
