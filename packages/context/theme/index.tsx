'use client'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

const themeAtom = atomWithStorage(
  '@novecirculos/theme',
  isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
)

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom)

  useLayoutEffect(() => {
    if (!isBrowser) return

    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return [theme, setTheme as any]
}
