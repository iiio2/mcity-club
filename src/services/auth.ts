import type { User } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { createContext, use } from 'react'
import { showErrorToast, showSuccessToast } from '../utils/toasts'
import { auth } from './firebase'

export interface AuthState {
  user: User | null
  /** True when `admins/{uid}` exists for the signed-in user. */
  isAdmin: boolean
  loading: boolean
}

export const AuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  loading: true,
})

export function useAuth() {
  return use(AuthContext)
}

export function logout() {
  signOut(auth)
    .then(() => showSuccessToast('Goodbye!!'))
    .catch(showErrorToast)
}
