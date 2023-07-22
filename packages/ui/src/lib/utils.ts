import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Platform } from 'react-native'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const showWeb = Platform.OS === 'web'
