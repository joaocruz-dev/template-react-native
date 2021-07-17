import { connect } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import auth from './auth'
import layout from './layout'

export const store = configureStore({
  reducer: { auth, layout }
})

export type RootState = ReturnType<typeof store.getState>

export type RootDispatch = typeof store.dispatch

export const connectStore = <PropsStore> (
  mapStateToProps: (state: RootState) => PropsStore
) => connect(mapStateToProps)
