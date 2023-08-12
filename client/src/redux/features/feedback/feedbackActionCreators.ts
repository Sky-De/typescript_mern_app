import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async () => {
    const { data } = await API.get("feedback/feedbacks");
    console.log(data, "feedSlice");

    return data;
  }
);
