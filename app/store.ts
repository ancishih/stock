import {configureStore} from '@reduxjs/toolkit'
import operationReducer from '../lib/operationSlice'
export const store = configureStore({
  reducer: {
    endpoint: operationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
