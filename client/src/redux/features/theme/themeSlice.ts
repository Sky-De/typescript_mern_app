import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  isDark: boolean;
};

// sets initial theme base on time
const isNightTime = (): boolean => {
  const currentHour = new Date().getHours();
  return currentHour >= 18 || currentHour < 6;
};

const initialUserState: ThemeState = {
  isDark: isNightTime(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialUserState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
