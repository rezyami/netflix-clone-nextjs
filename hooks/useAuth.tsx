import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

type UserLike = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  // add fields your app expects
};

const isDevLoginEnabled = 
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_ENABLE_DEV_LOGIN === 'true' &&
  process.env.NODE_ENV !== 'production';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  // Persisting the user
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string, setLoading: (b: boolean) => void, setUser: (u: UserLike | null) => void) => {
    setLoading(true)
const DEV_PASSWORD = process.env.NEXT_PUBLIC_DEV_USER_PASSWORD;
    if (isDevLoginEnabled) {
       if (DEV_PASSWORD && password !== DEV_PASSWORD) {
    alert('Invalid dev credentials');
    setLoading(false);
    return;
  }
    // Create a fake "user" for development. Use env vars or defaults.
    const devUser: UserLike = {
      uid: process.env.NEXT_PUBLIC_DEV_USER_UID || 'dev-uid',
      email: process.env.NEXT_PUBLIC_DEV_USER_EMAIL || email || 'dev@example.com',
      displayName: 'Developer',
    };

    await new Promise((r) => setTimeout(r, 150));
    setUser(devUser);
    setLoading(false);
    router.push('/');
    return { user: devUser };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user as unknown as UserLike);
    router.push('/');
    return userCredential;
  } catch (error: any) {
    alert(error?.message || 'Sign in failed');
    throw error;
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
