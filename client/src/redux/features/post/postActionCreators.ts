import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { closeModel } from "../model/modelSlice";
import { activeAlert } from "../alert/alertSlice";

// ---------------------------------------getPosts
// i did not use this - show case
export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
});

type Props = {
  currentPage: number;
  postPerPage: number;
};

// ---------------------------------------getBookMarks
export const getBookMarks = createAsyncThunk(
  "post/getBookMarks",
  async ({ currentPage, postPerPage }: Props) => {
    const { data } = await API.post("/post/user/bookmarks", {
      currentPage,
      postPerPage,
    });

    return data;
  }
);

// -----------------------------------getPostByCount
type CountPostProps = {
  postPerPage: Number;
  currentPage: Number;
};
export const getPostByCount = createAsyncThunk(
  "post/getPostByCount",
  async ({ postPerPage, currentPage }: CountPostProps) => {
    const { data } = await API.post("/post/posts/counted", {
      postPerPage,
      currentPage,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return data;
  }
);

// -----------------------------------getUserPosts
export const getUserPosts = createAsyncThunk(
  "post/getUserPosts",
  async ({ currentPage, postPerPage }: Props) => {
    const { data } = await API.post("/post/user/posts", {
      currentPage,
      postPerPage,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    console.log(data, "here");

    return data;
  }
);

// ---------------------------------------likePost
export const likePost = createAsyncThunk(
  "post/likePost",
  async (_id: string) => {
    const { data } = await API.patch(`/post/${_id}/like`);

    return { data, _id };
  }
);

// ----------------------------------------createPost
type CreateForm = {
  title: string;
  bookAuthor: string;
  desc: string;
  coverUrl: string;
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (newPost: CreateForm, { dispatch }) => {
    const { data } = await API.post(`/post/create`, newPost);
    // console.log("now must close nodel");
    dispatch(closeModel());
    dispatch(
      activeAlert({ type: "SUCCESS", message: "Post created successfully" })
    );

    return data;
  }
);

// ----------------------------------------------updatePost
type UpdateProps = {
  updatedPost: CreateForm;
  _id: string;
};

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ updatedPost, _id }: UpdateProps, { dispatch }) => {
    const { data } = await API.patch(`/post/${_id}/update`, updatedPost);
    dispatch(closeModel());
    dispatch(
      activeAlert({ type: "SUCCESS", message: "Post updated successfully" })
    );

    return data;
  }
);

// --------------------------------------------------deletePost
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (_id: string, { dispatch }) => {
    const { data } = await API.delete(`/post/${_id}/delete`);
    dispatch(closeModel());
    dispatch(
      activeAlert({ type: "SUCCESS", message: "Post deleted successfully" })
    );

    return data._id;
  }
);
