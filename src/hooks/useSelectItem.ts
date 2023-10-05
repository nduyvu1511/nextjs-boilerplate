import { Draft, produce } from 'immer'
import { useState } from 'react'

export type UseSelectItemProps<T = any> = {
  getId: (data: T) => number // dùng để xác định id nhằm mục đích so sánh
}

// là hook dùng để lấy ra những items được checked
export const UseSelectItem = <T = any>({ getId }: UseSelectItemProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const toggleSelectItem = (item: T) => {
    setSelectedItems((selectedItems) =>
      produce(selectedItems, (draft) => {
        const index = draft.findIndex((_item) => getId(_item as T) === getId(item))
        if (index !== -1) {
          draft.splice(index, 1)
        } else {
          draft.push(item as Draft<T>)
        }
      })
    )
  }

  const reset = () => {
    setSelectedItems([])
  }

  const toggleAllItems = (data: T[]) => {
    if (data?.length) {
      if (data.length === selectedItems.length) {
        reset()
      } else {
        setSelectedItems(data)
      }
    }
  }

  const deleteItemSelectedItem = (id: number) => {
    setSelectedItems((selectedItems) =>
      produce(selectedItems, (draft) => {
        const index = draft.findIndex((item) => getId(item as T) === id)
        if (index !== -1) {
          draft.splice(index, 1)
        }
      })
    )
  }

  return {
    selectedItems,
    selectedIds: selectedItems?.map((item) => getId(item)),
    reset,
    toggleAllItems,
    toggleSelectItem,
    deleteItemSelectedItem,
  }
}
