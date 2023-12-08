import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { closeModel } from "../model/modelSlice";
import { activeAlert } from "../alert/alertSlice";

// -------------------------------------------------------------------------------------------------------registerUser---
type RegisterProps = {
  name: string;
  email: string;
  password: string;
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData: RegisterProps, { dispatch }) => {
    const { data } = await API.post("user/register", formData);
    dispatch(closeModel());
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "You registered successfully, Welcome!!",
      })
    );

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------loginUser---
type LoginProps = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData: LoginProps, { dispatch }) => {
    const { data } = await API.post("user/login", formData);
    dispatch(closeModel());
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "You logged in successfully, Welcome Back!!",
      })
    );

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------loginUser---
type GoogleAuthProps = {
  token: string;
};
export const googleAuth = createAsyncThunk(
  "user/googleAuth",
  async (token: GoogleAuthProps, { dispatch }) => {
    // console.log("token", token);

    const { data } = await API.post("user/googleAuth", token);
    dispatch(closeModel());
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "You logged in with google successfully, Welcome Back!!",
      })
    );

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------loginUser---

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    const { data } = await API.post("user/logout");
    console.log(data);
    dispatch(closeModel());
    dispatch(
      activeAlert({ type: "INFO", message: "You logged out successfully" })
    );

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------updateUser---
type UpdateUserProps = {
  name?: string;
  email?: string;
  imgUrl?: string;
  id: string;
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData: UpdateUserProps, { dispatch }) => {
    const { id, ...newFormData } = formData;
    const { data } = await API.put(`user/${id}/update`, newFormData);
    dispatch(closeModel());
    dispatch(
      activeAlert({ type: "SUCCESS", message: "User updated successfully" })
    );

    console.log(data);

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------updateUserPass---
type UpdateUserPassProps = {
  password: string;
  newPassword: string;
  id: string;
};

export const updateUserPass = createAsyncThunk(
  "user/updateUserPass",
  async (formData: UpdateUserPassProps, { dispatch }) => {
    const { id, ...newFromData } = formData;
    const { data } = await API.patch(`user/${id}/update/password`, newFromData);
    dispatch(closeModel());
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "Your password updated successfully",
      })
    );
    console.log("clode model");
    console.log(data);

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------deleteUser---
type DeleteUserProps = {
  id: string;
};
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id }: DeleteUserProps, { dispatch }) => {
    // console.log(id);
    // console.log("id useraction");

    const { data } = await API.delete(`user/${id}/delete`);
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "User acount deleted successfully",
      })
    );
    dispatch(closeModel());
    console.log(data);

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------bookMarkPost---

export const bookMarkPost = createAsyncThunk(
  "user/bookMarkPost",
  async (id: string) => {
    const { data } = await API.patch(`user/${id}/bookmark`);
    console.log(data);

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------bookMarkPost---
type VerifyUserForm = {
  id: string;
  verifyCode: number;
};
export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (formData: VerifyUserForm, { dispatch }) => {
    const { data } = await API.post(`user/${formData.id}/verify`, {
      verifyCode: formData.verifyCode,
    });
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "Your email verified successfully!",
      })
    );

    console.log(data);

    return data;
  }
);

// -------------------------------------------------------------------------------------------------------bookMarkPost---

export const getVerifyEmail = createAsyncThunk(
  "user/getVerifyEmail",
  async (id: string, { dispatch }) => {
    const { data } = await API.get(`user/${id}/verify/email`);
    console.log(data, "data crator");

    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: data.msg,
      })
    );

    return data;
  }
);
