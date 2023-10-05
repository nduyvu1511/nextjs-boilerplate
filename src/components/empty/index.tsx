import { Images } from '@/assets'
import classnames from 'classnames'
import Image, { ImageProps } from 'next/image'
import { Button } from '../button'
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'

export type EmptyProps = Partial<Pick<ImageProps, 'src'>> & {
  description?: string
  descClassName?: string
  imageClassName?: string
  children?: JSX.Element
  className?: string
  textClassName?: string
  btnTitle?: string
  onBtnClick?: () => void
}

export const Empty = ({
  description = 'Không có dữ liệu',
  descClassName,
  imageClassName,
  children,
  className,
  btnTitle,
  src = Images.empty,
  onBtnClick,
  ...props
}: EmptyProps) => {
  return (
    <div className={classnames('flex-center flex-col py-24', className)}>
      <Image
        className={twMerge(classNames('w-[80px] h-[80px] object-contain mb-2', imageClassName))}
        src={src}
        {...props}
        alt="empty image"
      />

      <p className={twMerge(classNames('text-14-normal text-gray60', descClassName))}>
        {description}
      </p>

      {onBtnClick ? (
        <Button className="mt-3" onClick={() => onBtnClick?.()} title={btnTitle} />
      ) : null}

      {children}
    </div>
  )
}
