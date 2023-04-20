import { useEffect, useRef, useState, RefObject, MutableRefObject } from 'react'

type Callback = () => void

export const useInfiniteScroll = (callback: Callback): [RefObject<any>] => {
  const [isLoading, setIsLoading] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const lastElementRef = (node: HTMLElement | null) => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsLoading(true)
        callback()
      }
    })

    if (node) observer.current.observe(node)
  }

  useEffect(() => {
    setIsLoading(false)
  }, [callback])

  return [lastElementRef as unknown as RefObject<any>]
}
