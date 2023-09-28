import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import {
  bookMarkPost,
  deleteUser,
  getVerifyEmail,
  googleAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  updateUserPass,
  verifyUser,
} from "./userActionCreators";

export type User = {
  _id: string;
  isVerified: boolean;
  name: string;
  email: string;
  bookMarks: string[];
  imgUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export type ActionErrorType = PayloadAction<
  unknown,
  string,
  {
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | ({
        rejectedWithValue: false;
      } & {})
  ),
  SerializedError
>;

const initialUserState: UserState = {
  user: JSON.parse(sessionStorage.getItem("user") ?? "null"),
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    resetUserError(state) {
      state.error = null;
    },
    resetUser(state) {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    // ----------------------------------------register--
    // FIX--type for actions
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    builder.addCase(registerUser.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to register user";
    });
    // ----------------------------------------googleAuth--
    // FIX--type for actions
    builder.addCase(googleAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      googleAuth.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    builder.addCase(googleAuth.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to register user";
    });
    // ----------------------------------------verify--
    // FIX--type for actions
    builder.addCase(verifyUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      verifyUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(verifyUser.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to verify user";
    });
    // ----------------------------------------getVerifyEmail--
    // FIX--type for actions
    builder.addCase(getVerifyEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getVerifyEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getVerifyEmail.rejected, (state) => {
      state.isLoading = false;
      state.error = "Sending verify email failed!";
    });
    // ---------------------------------------login---
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    // FIX--PayloadAction<this types>
    builder.addCase(loginUser.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to login user";
    });
    // ---------------------------------------logout---
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
      sessionStorage.removeItem("user");
    });
    builder.addCase(logoutUser.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to logout user";
    });
    // ----------------------------------------updateUser--
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    builder.addCase(updateUser.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to update user";
    });
    // ----------------------------------------updateUserPass--
    builder.addCase(updateUserPass.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateUserPass.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(
      updateUserPass.rejected,
      (state, action: ActionErrorType) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update password";
      }
    );
    // -------------------------------------deleteUser-----
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      sessionStorage.removeItem("user");
    });
    builder.addCase(deleteUser.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to delete user";
    });

    // -------------------------------------bookMarkPost-----
    builder.addCase(bookMarkPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      bookMarkPost.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        // const reduxStore = store.getState();
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    );
    builder.addCase(bookMarkPost.rejected, (state, action: ActionErrorType) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to book mark post";
    });
  },
});

export const { resetUserError, resetUser } = userSlice.actions;

export default userSlice.reducer;
