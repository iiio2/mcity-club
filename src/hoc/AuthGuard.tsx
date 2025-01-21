import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebase } from '../services/firebase'

interface Props {
  children?: ReactNode
}
function AuthGuard({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(firebase.auth().currentUser)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      navigate('/sign_in', { replace: true })
    }
  }, [loading, user, navigate])

  if (loading)
    return null

  return <>{children}</>
}

export default AuthGuard
