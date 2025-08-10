import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  highestLevelAchieved: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | null;
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
  name: "auth",
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
    // New reducer to update user after assessment
    updateUserAssessmentStatus: (
      state,
      action: PayloadAction<{
        highestLevelAchieved: TUser["highestLevelAchieved"];
        currentStep: TUser["currentStep"];
      }>
    ) => {
      if (state.user) {
        state.user.highestLevelAchieved = action.payload.highestLevelAchieved;
        state.user.currentStep = action.payload.currentStep;
      }
    },
  },
});

export const { setUser, logout, updateUserAssessmentStatus } =
  authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
