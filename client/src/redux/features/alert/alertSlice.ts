import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertState = {
  isActive: boolean;
  message: string;
  duration: number;
  type: "INFO" | "WARNING" | "SUCCESS" | "FAILD";
};

type AlertPayload = {
  message: string;
  type: "INFO" | "WARNING" | "SUCCESS" | "FAILD";
};

const AlertInitialState: AlertState = {
  isActive: false,
  message: "something for test",
  duration: 3000,
  type: "INFO",
};

const alertSlice = createSlice({
  name: "alert",
  initialState: AlertInitialState,
  reducers: {
    activeAlert(state, action: PayloadAction<AlertPayload>) {
      state.isActive = !state.isActive;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    deactiveAlert(state) {
      state.isActive = false;
    },
  },
});

export const { activeAlert, deactiveAlert } = alertSlice.actions;
export default alertSlice.reducer;
