import { useEffect, useState } from 'react'

function readValue(key, initialValue) {
  if (typeof window === 'undefined') {
    return initialValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue === null ? initialValue : JSON.parse(storedValue)
  } catch {
    return initialValue
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  useEffect(() => {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(key)
        return
      }

      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage write errors in the demo app.
    }
  }, [key, value])

  const removeValue = () => {
    setValue(undefined)

    try {
      window.localStorage.removeItem(key)
    } catch {
      // Ignore storage removal errors in the demo app.
    }
  }

  return [value, setValue, removeValue]
}
