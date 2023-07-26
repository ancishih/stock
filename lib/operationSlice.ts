import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  prefix: 'http://127.0.0.1:8081',
  suffix: '/api/v1/profile',
}

export const endpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    endpointPrefix: (state, action: PayloadAction<string>) => {
      state.prefix = action.payload
    },
    endpointSuffix: (state, action: PayloadAction<string>) => {
      state.suffix = action.payload
    },
  },
})

export const {endpointPrefix, endpointSuffix} = endpointSlice.actions

export default endpointSlice.reducer
