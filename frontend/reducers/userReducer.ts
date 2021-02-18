import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../interfaces'

const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    login(state, { payload }: PayloadAction<User>){
      return state = payload
    }
  }
})

export const { login } = userSlice.actions

export const userReducer = userSlice.reducer