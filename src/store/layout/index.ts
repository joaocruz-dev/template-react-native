import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import state from './state'

const slice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    setLoadingFn (state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    showMessageFn (state, action: PayloadAction<{ text: string, duration?: number }>) {
      state.message.show = true
      state.message.text = action.payload.text
      state.message.duration = action.payload.duration || null
    },
    hideMessageFn (state) {
      state.message.show = false
      state.message.text = null
      state.message.duration = null
    }
  }
})

export default slice.reducer

export const { setLoadingFn, showMessageFn, hideMessageFn } = slice.actions
