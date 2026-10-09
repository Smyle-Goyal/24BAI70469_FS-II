import { useContext } from 'react'
import { UserContext } from './UserContext'

export function useUser() {
  const context = useContext(UserContext)
  return context
}