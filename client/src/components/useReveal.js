import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((node, i) => {
              setTimeout(() => node.classList.add('visible'), i * 90)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
