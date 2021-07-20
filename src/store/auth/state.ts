import { User } from '@/domain'

interface AuthState {
  isAuth: boolean,

  user: User | null
}

const state: AuthState = {
  isAuth: false,

  user: null
}

export default state
