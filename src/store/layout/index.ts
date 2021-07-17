import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import state from './state'

const slice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setLoadingFn (state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export default slice.reducer

export const { setLoadingFn } = slice.actions
