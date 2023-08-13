import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModelTypes =
  | "AUTH"
  | "SHOW"
  | "POST_EDIT"
  | "POST_CREATE"
  | "POST_DELETE"
  | "USER_PASS_EDIT"
  | "USER_NAME_EDIT"
  | "USER_IMG_EDIT"
  | "USER_ACCOUNT_DELETE";

type ModelState = {
  isOpen: boolean;
  type: ModelTypes;
};

const initialUserState: ModelState = {
  isOpen: false,
  type: "AUTH",
};

const modelSlice = createSlice({
  name: "model",
  initialState: initialUserState,
  reducers: {
    toggleModel(state) {
      state.isOpen = !state.isOpen;
    },
    openModel(state, action: PayloadAction<ModelTypes>) {
      state.type = action.payload;
      state.isOpen = true;
    },
    closeModel(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleModel, openModel, closeModel } = modelSlice.actions;
export default modelSlice.reducer;
