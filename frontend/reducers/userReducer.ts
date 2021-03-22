import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../interfaces'

const userSlice = createSlice({
  name: "user",
  initialState: null as User | null | "loading",
  reducers: {
    login(state, { payload }: PayloadAction<User | null | "loading">){
      return state = payload
    }
  }
})

export const { login } = userSlice.actions

export const selectUser = (state: any) => state.user

export const userReducer = userSlice.reducer