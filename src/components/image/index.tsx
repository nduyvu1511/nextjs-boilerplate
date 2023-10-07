import { Images } from '@/assets'
import classNames from 'classnames'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import RImage, { ImageProps as RImageProps } from 'next/image'
import { useState } from 'react'

export type ImageProps = Omit<RImageProps, 'alt'> & {
  alt?: string
  className?: string
}

// extends từ Image của next, load default image nếu không thể load được hình
export const Image = ({ className, src, ...props }: ImageProps) => {
  const [source, setSource] = useState<string | StaticImport>(src)

  return (
    <RImage
      alt="image"
      width={300}
      height={300}
      loading="lazy"
      className={classNames('object-cover', className)}
      onError={() => setSource(Images.default)}
      blurDataURL={Images.blur}
      {...props}
      src={source}
    />
  )
}
