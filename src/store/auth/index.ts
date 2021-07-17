import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import state from './state'
import { User } from '@/domain'

const slice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    loginFn (state, action: PayloadAction<{ user: User }>) {
      state.isAuth = true
      state.user = action.payload.user
    }
  }
})

export default slice.reducer

export const { loginFn } = slice.actions
