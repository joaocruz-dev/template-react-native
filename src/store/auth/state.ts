import { User } from '@/domain'

interface AuthState {
  jwt: {
    token: string | null
  },
  user: User | null,
  isAuth: boolean,
}

const state: AuthState = {
  jwt: {
    token: null
  },
  user: null,
  isAuth: false
}

export default state
