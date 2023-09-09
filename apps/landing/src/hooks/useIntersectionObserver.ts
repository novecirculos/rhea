import { type RefObject, useEffect } from 'react'

export function useIntersectionObserver(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ref.current?.setAttribute('data-visible', 'true')
        } else {
          ref.current?.setAttribute('data-visible', 'false')
        }
      })
    }

    const intersectionObserver = new IntersectionObserver(
      observerCallback,
      options
    )

    if (ref.current) {
      intersectionObserver.observe(ref.current)
    }

    return () => {
      intersectionObserver.disconnect()
    }
  }, [ref])
}
