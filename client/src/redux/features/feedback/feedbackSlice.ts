import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFeedbacks, sendFeedback } from "./feedbackActionCreators";
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
  getIsLoading: boolean;
  sendIsLoading: boolean;
  getError: null | string;
  sendError: null | string;
};

const FeedbackInitialState: FeedbackState = {
  feedbacks: [],
  getIsLoading: false,
  sendIsLoading: false,
  getError: null,
  sendError: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: FeedbackInitialState,
  reducers: {
    resetFeedbackErrors(state) {
      state.getError = null;
      state.sendError = null;
    },
  },
  extraReducers: (builder) => {
    // ------------------------------------getFeedbacks--
    builder.addCase(getFeedbacks.pending, (state) => {
      state.getIsLoading = true;
      state.getError = null;
    });
    builder.addCase(
      getFeedbacks.fulfilled,
      (state, action: PayloadAction<Feedback[]>) => {
        state.getIsLoading = false;
        state.feedbacks = action.payload;
      }
    );
    builder.addCase(getFeedbacks.rejected, (state, action: ActionErrorType) => {
      state.getIsLoading = false;
      state.getError = action.error.message || "Failed to register user";
    });
    // ------------------------------------sendFeedback--
    builder.addCase(sendFeedback.pending, (state) => {
      state.sendIsLoading = true;
      state.sendError = null;
    });
    builder.addCase(
      sendFeedback.fulfilled,
      (state, action: PayloadAction<Feedback>) => {
        state.sendIsLoading = false;
        state.feedbacks.unshift(action.payload);
      }
    );
    builder.addCase(sendFeedback.rejected, (state, action: ActionErrorType) => {
      state.sendIsLoading = false;
      state.sendError = action.error.message || "Failed to register user";
    });
  },
});

export const { resetFeedbackErrors } = feedbackSlice.actions;
export default feedbackSlice.reducer;
