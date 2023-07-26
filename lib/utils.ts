import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import duration from 'dayjs/plugin/duration'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(utc)
dayjs.extend(isBetween)
dayjs.extend(isLeapYear)
dayjs.extend(weekOfYear)
dayjs.extend(duration)
dayjs.extend(updateLocale)

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {cn, dayjs}
