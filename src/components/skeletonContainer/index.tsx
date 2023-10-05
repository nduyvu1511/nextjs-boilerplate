import { Colors } from '@/constants'
import { ReactNode } from 'react'
import { SkeletonTheme, SkeletonThemeProps } from 'react-loading-skeleton'

export type SkeletonContainerProps = SkeletonThemeProps & {
  children: ReactNode
  className?: string
}

export const SkeletonContainer = ({ children, className, ...props }: SkeletonContainerProps) => {
  return (
    <SkeletonTheme borderRadius={8} baseColor={Colors.gray10} {...props}>
      <div className={className}>{children}</div>
    </SkeletonTheme>
  )
}

/* 
Example usage: 
 <SkeletonContainer className="flex flex-col gap-[12px]">
   {Array.from({ length: 10 }).map((_, index) => (
     <Skeleton key={index} className="h-[120px]" />
   ))}
  </SkeletonContainer>
*/
