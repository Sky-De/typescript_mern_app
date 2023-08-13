import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { activeAlert } from "../alert/alertSlice";

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async () => {
    const { data } = await API.get("feedback/feedbacks");
    console.log(data, "feedSlice");

    return data;
  }
);
// ------------------------------------------------------------------
type SendFeedbackProps = {
  creatorId: string;
  feedback: string;
};

export const sendFeedback = createAsyncThunk(
  "feedback/sendFeedback",
  async (props: SendFeedbackProps, { dispatch }) => {
    const { data } = await API.post("feedback/create", props);
    console.log(data, "feedSlice");
    dispatch(
      activeAlert({
        type: "SUCCESS",
        message: "Your feedback sended successfully, thanks :) ",
      })
    );

    return data;
  }
);
