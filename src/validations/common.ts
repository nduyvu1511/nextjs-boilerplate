import { DEFAULT_REQUIRED_MESSAGE, Regex } from '@/constants'
import { IdAndName } from '@/types'
import * as Yup from 'yup'

export const IdAndNameSchema: Yup.ObjectSchema<IdAndName<number>> = Yup.object()
  .shape({
    id: Yup.number().required(),
    name: Yup.string().required(),
  })
  .typeError(DEFAULT_REQUIRED_MESSAGE)

export const IdAndNameGenericSchema = <T extends string>(data: T[]) => {
  return Yup.object()
    .shape({
      id: Yup.string().oneOf(data).required(),
      name: Yup.string().required(),
    })
    .typeError(DEFAULT_REQUIRED_MESSAGE)
}

export const IdAndUrlSchema = Yup.object()
  .shape({
    id: Yup.number().required(),
    url: Yup.string().required(),
  })
  .typeError(DEFAULT_REQUIRED_MESSAGE)
  .required(DEFAULT_REQUIRED_MESSAGE)

export const EmailSchema = Yup.string().matches(Regex.email, 'Vui lòng nhập đúng định dạng email')

export const PhoneSchema = Yup.string().matches(
  Regex.phone,
  'Vui lòng nhập đúng định dạng số điện thoại'
)

export const RatingStarSchema = Yup.string()
  .oneOf(['1', '2', '3', '4', '5'])
  .required(DEFAULT_REQUIRED_MESSAGE)
