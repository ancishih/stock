import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
export interface StockRecord {
  symbol: string
  name: string
}

const initialState: StockRecord[] = []

export const recordSlice = createSlice({
  name: 'stockRecord',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<StockRecord>) => {
      state.push(action.payload)
    },
    removeRecord: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
  },
})

export const {addRecord, removeRecord} = recordSlice.actions

export default recordSlice.reducer
