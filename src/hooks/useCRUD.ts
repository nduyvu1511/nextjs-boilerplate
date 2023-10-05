import { Draft, produce } from 'immer'
import { useState } from 'react'

export type UseCRUDProps<Data = any> = {
  defaultValues: Data[]
  swrKey: string
  getId: (data: Data) => number
}

export const useCRUD = <Data = any>({ defaultValues = [], swrKey, getId }: UseCRUDProps<Data>) => {
  const [data, setData] = useState<Data[]>(defaultValues)

  const deleteItem = (id: number) => {
    setData((data) =>
      produce(data, (draft) => {
        const index = draft.findIndex((item) => getId(item as Data) === id)
        if (index !== -1) {
          draft.splice(index, 1)
        }
      })
    )
  }

  const deleteItems = (ids: number[]) => {
    setData((data) =>
      data?.length
        ? produce(data, (draft) => draft.filter((item) => !ids.includes(getId(item as Data))))
        : data
    )
  }

  const createItem = (item: Data) => {
    setData((data) =>
      produce(data, (draft) => {
        draft.unshift(item as Draft<Data>)
      })
    )
  }

  const updateItem = (item: Data) => {
    const itemId = getId(item)
    if (data?.length && itemId) {
      setData((data) =>
        produce(data, (draft) => {
          const index = draft.findIndex((_item) => getId(_item as Data) === itemId)
          if (index !== -1) {
            draft[index] = item as Draft<Data>
          }
        })
      )
    }
  }

  return {
    swrKey,
    deleteItem,
    createItem,
    updateItem,
    deleteItems,
  }
}
