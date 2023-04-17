import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Component
const Portal = props => {
  const { children, selector } = props

  const [mounted, setMounted] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    ref.current = document.querySelector(`#${selector}`)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}

export default Portal
