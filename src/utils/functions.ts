import { Regex } from '@/constants'
import _ from 'lodash'

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export function isValidHttpUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end)
}

export const isDecimalNumber = (value: any) => {
  if (typeof value !== 'number') {
    return false
  }

  if (!isFinite(value)) {
    return false
  }

  if (Math.floor(value) === value) {
    return false
  }

  return true
}

export const formatNumber = (money: number, separator = ',') => {
  if (!money) return '0'
  return (money + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator)
}

export const formatNumberDec = (nStr: string, decSeparate: string, groupSeparate: string) => {
  nStr += ''
  let x = nStr.split(decSeparate)
  let x1 = x[0]
  let x2 = x.length > 1 ? '.' + x[1] : ''
  let rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + groupSeparate + '$2')
  }
  return x1 + x2
}

// hàm định dạng tiền việt nam
export function formatMoneyVND(num: number | string, prefix = ' đ'): string {
  if (typeof num == 'number') {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${prefix ? `${prefix}` : ''}`
  } else if (typeof num == 'string') {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${prefix ? ` ${prefix}` : ''}`
  }

  return num
}

export function formatNumberInput(value: string, separator = ',') {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function convertViToEn(str: string, toUpperCase = false) {
  if (!str) return ''

  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

export const calculateElapsedTime = (timeCreated: string) => {
  const created = new Date(timeCreated).getTime()
  let periods: any = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  }
  let diff = Date.now() - created

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key])
      return `${result} ${result === 1 ? key : key + 's'} ago`
    }
  }

  return 'Just now'
}

export function checkAnyKeyInObjectHasValue(object: Object | undefined) {
  const array = Object.values(object || {})
  if (!array?.length) return false
  return array.some((value) => value !== '' && value !== null && value !== undefined)
}

export function checkEveryKeyInObjectHasValue(object: Object) {
  return Object.values(object).every(
    (value) => value !== '' && value !== null && value !== undefined
  )
}

export function removeEmptyValueFromObject<T>(obj: T extends object ? object : any): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== '')
  ) as T
}

export const toImageUrl = (url: string | undefined | null) => {
  if (!url) return ''

  if (url?.includes?.('https://') || url?.includes?.('http://')) return url

  return `${process.env.NEXT_PUBLIC_API_URL}${url}`
}

export const toBase64Image = (url: string) => `data:image/jpeg;base64,${url}`

export const removeBase64Reader = (str: string) => str.replace(Regex.base64_reader, '')

export const reverseDateFormat = (date: string) => date.split('-').reverse().join('-')

export const isUnknownDataTruethy = (data: any): data is boolean => {
  if (_.isArray(data)) {
    return data?.length > 0
  } else if (_.isObject(data)) {
    return Object.keys(data || {})?.length > 0
  }

  return !!data
}

export const changeImageWidthHeightFromHtml = (html: string) => {
  return html.replace(/(width=")\d+("\W+height=")\d+/gi, '$100%$auto')
}

export const formatSaleTargetByNumberB = (current: any, target: any) => {
  if (target <= 0) {
    return 0
  } else {
    return parseFloat(((current / target) * 100).toFixed(1))
  }
}

export const formatDateDMY = (date: string) => {
  var d = new Date(date)
  if (d instanceof Date && !isNaN(d.valueOf())) {
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  } else {
    return date.slice(0, 10).split('-').reverse().join('-')
  }
}

export const stringToDate = (dateStr: string) => {
  const parts: any = dateStr.split('-')
  return new Date(parts[2], parts[1] - 1, parts[0])
}

export const formatSaleTargetByText = (current: any, target: any) => {
  const type: any = target - current
  switch (type) {
    case type < 0:
      return `Bạn đã vượt doanh số ${formatMoneyVND(type * -1)}`
    case type > 0:
      return `Bạn cần ${formatMoneyVND(type)} để đạt chỉ tiêu`
    default:
      return 'Bạn đã đạt chỉ tiêu'
  }
}

export const removeHTMLFromString = (html: string): string => {
  return html.replace(/<[^>]+>/g, '')
}

export const getUniqueId = () => Date.now().toString(36)

export const formatPhoneNumber = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/\D/g, '')

  if (phoneNumber.startsWith('84')) {
    return phoneNumber.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, '+84 ($1) $2-$3$4')
  } else {
    return phoneNumber.replace(/^(\d{2})(\d{4})(\d+)$/, '($1) $2-$3')
  }
}

export const isInRange = (value: number, target: number, threshold: number) =>
  value < target + threshold && value > target - threshold

export const toArrayStringQueryString = (array?: string[]) => {
  return array?.length ? `[${array?.map((item) => `'${item}'`)?.join(', ')}]` : undefined
}

export const toArrayNumberQueryString = (array?: number[]) => {
  return array?.length ? `[${array?.join(', ')}]` : undefined
}

export const isNumber = (value: string) => !isNaN(Number(value))
