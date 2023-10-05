import { IdAndName } from '@/types'
import React from 'react'

export type BreadcrumbProps = {
  data: (IdAndName & { active?: boolean })[]
}

export const Breadcrumb = ({ data }: BreadcrumbProps) => {
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
