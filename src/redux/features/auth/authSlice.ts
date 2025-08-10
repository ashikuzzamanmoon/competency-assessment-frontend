import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// This TUser type is now updated to include all necessary properties from the backend.
type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  highestLevelAchieved: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;
  currentStep: 0 | 1 | 2 | 3 | 4;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;