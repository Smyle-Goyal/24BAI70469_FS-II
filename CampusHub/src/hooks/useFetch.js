import { useEffect, useState } from 'react'
import { fetchPosts } from '../services/api.js'

export default function useFetch() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadPosts() {
      try {
        setLoading(true)
        const posts = await fetchPosts()

        if (isActive) {
          setData(posts.slice(0, 10))
          setError('')
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || 'Unable to load posts.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadPosts()

    return () => {
      isActive = false
    }
  }, [])

  return { data, loading, error }
}
