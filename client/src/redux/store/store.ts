import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import themeReducer from "../features/theme/themeSlice";
import modelReducer from "../features/model/modelSlice";
import postReducer from "../features/post/postSlice";
import alertReducer from "../features/alert/alertSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    model: modelReducer,
    post: postReducer,
    alert: alertReducer,
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
