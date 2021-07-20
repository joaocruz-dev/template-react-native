import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import state from './state'
import { User } from '@/domain'

const slice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setUserFn (state, action: PayloadAction<User>) {
      state.isAuth = true
      state.user = action.payload
    },
    logoutFn (state) {
      state.isAuth = false

      state.user = null
    }
  }
})

export default slice.reducer

export const { setUserFn, logoutFn } = slice.actions
