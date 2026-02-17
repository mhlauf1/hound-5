'use client'
import {useState, useEffect} from 'react'

export function useMediaQuery(query: string): {matches: boolean; ready: boolean} {
  const [matches, setMatches] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    setReady(true)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return {matches, ready}
}
