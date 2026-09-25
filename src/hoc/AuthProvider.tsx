import type { ReactNode } from 'react'
import type { AuthState } from '../services/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { AuthContext } from '../services/auth'
import { adminsCollection, auth } from '../services/firebase'

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  })

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false })
        return
      }

      setState({ user, isAdmin: false, loading: true })
      let isAdmin = false
      try {
        isAdmin = (await getDoc(doc(adminsCollection, user.uid))).exists()
      }
      catch {
        // Treat a failed lookup as "not an admin"; the rules enforce it anyway.
      }
      // Ignore the result if the user changed while the lookup was in flight.
      if (auth.currentUser?.uid === user.uid)
        setState({ user, isAdmin, loading: false })
    })
  }, [])

  return <AuthContext value={state}>{children}</AuthContext>
}

export default AuthProvider
