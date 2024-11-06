// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { role: null },
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
