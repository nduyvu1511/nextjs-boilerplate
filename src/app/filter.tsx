import { Button } from '@/components'
import { productManageAPI } from '@/services'
import { BaseFilterProps, GetProductListReq, ProductModel } from '@/types'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const ProductFilter = ({
  defaultValues,
  onChange,
  onClose,
}: BaseFilterProps<GetProductListReq>) => {
  const router = useRouter()
  const [params, setParams] = useState<GetProductListReq>(defaultValues || {})

  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await productManageAPI.getCategoryList({})
      return result?.data?.result || []
    },
  })

  const onSubmit = () => {
    onChange?.({ category_id: params.category_id })
  }

  return (
    <div className="flex-1">
      <ul className="overflow-y-auto flex-1 max-h-[50vh]">
        {data?.map((item) => {
          const active = params?.category_id && params?.category_id === item.category_id
          return (
            <li
              key={item.category_id}
              className={classNames(
                'px-[12px] py-[12px] cursor-pointer hover:bg-black05',
                active && 'bg-black05'
              )}
              // onClick={() => setParams({ ...params, category_id: item.category_id })}
              onClick={() => router.push(`/?category=${item.category_id}`)}
            >
              <p className={classNames('text-14-medium', active && 'text-primary')}>
                {item.category_name}
              </p>
            </li>
          )
        })}
      </ul>
      <div className="">
        <Button title="Áp dụng" onClick={onSubmit} />
      </div>
    </div>
  )
}
