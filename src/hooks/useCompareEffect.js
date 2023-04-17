import { useEffect, useRef } from 'react'
import { equals as deepEqual } from 'ramda'

export const useDeepCompareMemoize = value => {
  const ref = useRef()

  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export const useCompareEffect = (callback, dependencies) => {
  useEffect(callback, useDeepCompareMemoize(dependencies))
}

export default useCompareEffect
