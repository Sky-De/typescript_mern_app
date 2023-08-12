import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFeedbacks } from "./feedbackActionCreators";
import { ActionErrorType } from "../user/userSlice";

type Feedback = {
  creatorName: string;
  creatorImgUrl: string;
  createdAt: Date;
  feedback: string;
  _id: string;
};

type FeedbackState = {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: null | string;
};

const FeedbackInitialState: FeedbackState = {
  feedbacks: [],
  isLoading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: FeedbackInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // ----------------------------------------getFeedbacks--
    builder.addCase(getFeedbacks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getFeedbacks.fulfilled,
      (state, action: PayloadAction<Feedback[]>) => {
        state.isLoading = false;
        state.feedbacks = action.payload;
      }
    );
    builder.addCase(getFeedbacks.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to register user";
    });
  },
});

export default feedbackSlice.reducer;
