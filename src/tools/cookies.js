import { useEffect, useState } from 'react'

// Get
export const getCookie = name => {
  if (typeof document !== 'undefined') {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }
}

// Set
export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey
    const optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }

  if (document) {
    document.cookie = updatedCookie
  }
}

// Remove
export const removeCookie = name => {
  setCookie(name, '', {
    'max-age': -1
  })
}

// Hook
export const getCookieHook = name => {
  const [myCookie, setMyCookie] = useState(undefined)
  useEffect(() => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    )
    const findCookie = matches ? decodeURIComponent(matches[1]) : undefined
    setMyCookie(findCookie)
  }, [])
  return myCookie
}
