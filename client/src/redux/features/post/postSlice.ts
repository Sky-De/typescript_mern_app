import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActionErrorType } from "../user/userSlice";
import {
  createPost,
  deletePost,
  getBookMarks,
  getPostByCount,
  getPosts,
  getUserPosts,
  likePost,
  updatePost,
} from "./postActionCreators";

type PostsActionPayloadType = PayloadAction<Post[]>;
type PostActionPayloadType = PayloadAction<Post>;
type AllPostActionPayloadType = PayloadAction<{
  count: number;
  postPerPage: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}>;

type UserPostActionPayloadType = PayloadAction<{
  count: number;
  postPerPage: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}>;

// FIX--
// type LikePostActionPayloadType = PayloadAction<{
//   _id: string;
//   data: string[];
// }>;

type BookMarkPostsActionPayloadType = PayloadAction<{
  count: number;
  postPerPage: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}>;

export type Post = {
  _id: string;
  title: string;
  bookAuthor: string;
  desc: string;
  coverUrl: string;
  likes: string[];
  createdBy: string;
  isDetails?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type PostState = {
  allPosts: {
    count: number;
    postPerPage: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
    posts: Post[];
  };
  userPosts: {
    count: number;
    postPerPage: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
    posts: Post[];
  };
  bookMarks: {
    count: number;
    postPerPage: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
    posts: Post[];
  };
  selectedPost: Post;
};

const selectedPostInitial = {
  _id: "",
  title: "",
  bookAuthor: "",
  desc: "",
  coverUrl: "",
  likes: [],
  createdBy: "",
  isDetails: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const initialPostState: PostState = {
  allPosts: {
    count: 1,
    posts: [],
    postPerPage: 9,
    currentPage: 1,
    isLoading: false,
    error: null,
  },
  userPosts: {
    count: 1,
    posts: [],
    postPerPage: 6,
    currentPage: 1,
    isLoading: false,
    error: null,
  },
  bookMarks: {
    count: 1,
    posts: [],
    postPerPage: 6,
    currentPage: 1,
    isLoading: false,
    error: null,
  },
  selectedPost: selectedPostInitial,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    incraseAllPostsPage(state) {
      state.allPosts.currentPage++;
    },
    decraseAllPostsPage(state) {
      state.allPosts.currentPage--;
    },
    setAllPostsPage(state, action: PayloadAction<number>) {
      state.allPosts.currentPage = action.payload;
    },

    incraseUserPostsPage(state) {
      state.userPosts.currentPage++;
    },
    decraseUserPostsPage(state) {
      state.userPosts.currentPage--;
    },
    setUserPostsPage(state, action: PayloadAction<number>) {
      state.userPosts.currentPage = action.payload;
    },

    incraseBookMarkPostsPage(state) {
      state.bookMarks.currentPage++;
    },
    decraseBookMarkPostsPage(state) {
      state.bookMarks.currentPage--;
    },
    setBookMarkPostsPage(state, action: PayloadAction<number>) {
      state.bookMarks.currentPage = action.payload;
    },

    setSelectedPost(state, action: PostActionPayloadType) {
      state.selectedPost = action.payload;
    },

    resetPostError(state) {
      state.allPosts.error = null;
      state.userPosts.error = null;
      state.bookMarks.error = null;
    },
  },
  extraReducers(builder) {
    // ----------------------------------------getPosts--
    builder.addCase(getPosts.pending, (state) => {
      state.allPosts.isLoading = true;
      state.allPosts.error = null;
    });
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PostsActionPayloadType) => {
        state.allPosts.isLoading = false;
        state.allPosts.posts = action.payload;
      }
    );
    builder.addCase(getPosts.rejected, (state, action: ActionErrorType) => {
      state.allPosts.isLoading = false;
      state.allPosts.error = action.error.message || "Faild to get posts";
    });

    // ----------------------------------------getPostsByCount--
    builder.addCase(getPostByCount.pending, (state) => {
      state.allPosts.isLoading = true;
      state.allPosts.error = null;
    });
    builder.addCase(
      getPostByCount.fulfilled,
      (state, action: AllPostActionPayloadType) => {
        state.allPosts.isLoading = false;
        state.allPosts.posts = action.payload.posts;
        state.allPosts.count = action.payload.count;
      }
    );
    builder.addCase(
      getPostByCount.rejected,
      (state, action: ActionErrorType) => {
        state.allPosts.isLoading = false;
        state.allPosts.error =
          action.error.message || "Faild to get posts by count";
      }
    );

    // ----------------------------------------getBookMarks--
    builder.addCase(getBookMarks.pending, (state) => {
      state.bookMarks.isLoading = true;
      state.bookMarks.error = null;
    });
    builder.addCase(
      getBookMarks.fulfilled,
      (state, action: BookMarkPostsActionPayloadType) => {
        state.bookMarks.isLoading = false;
        state.bookMarks.posts = action.payload.posts;
        state.bookMarks.count = action.payload.count;
      }
    );
    builder.addCase(getBookMarks.rejected, (state, action: ActionErrorType) => {
      state.bookMarks.isLoading = false;
      state.bookMarks.error = action.error.message || "Faild to get posts";
    });

    // ----------------------------------------getUserPosts--
    builder.addCase(getUserPosts.pending, (state) => {
      state.userPosts.isLoading = true;
      state.userPosts.error = null;
    });
    builder.addCase(
      getUserPosts.fulfilled,
      (state, action: UserPostActionPayloadType) => {
        state.userPosts.isLoading = false;
        state.userPosts.count = action.payload.count;
        state.userPosts.posts = action.payload.posts;
      }
    );
    builder.addCase(getUserPosts.rejected, (state, action: ActionErrorType) => {
      state.userPosts.isLoading = false;
      state.userPosts.error = action.error.message || "Faild to get user posts";
    });
    // ----------------------------------------likePost--
    builder.addCase(likePost.pending, (state) => {
      state.allPosts.isLoading = true;
      state.allPosts.error = null;
    });
    builder.addCase(likePost.fulfilled, (state, action: PayloadAction<any>) => {
      // console.log(action.payload);

      state.allPosts.isLoading = false;
      state.allPosts.posts = state.allPosts.posts.map((post) =>
        post._id === action.payload._id
          ? { ...post, likes: action.payload.data }
          : post
      );
      state.bookMarks.posts = state.bookMarks.posts.map((post) =>
        post._id === action.payload._id
          ? { ...post, likes: action.payload.data }
          : post
      );
      state.userPosts.posts = state.userPosts.posts.map((post) =>
        post._id === action.payload._id
          ? { ...post, likes: action.payload.data }
          : post
      );
    });
    builder.addCase(likePost.rejected, (state, action: ActionErrorType) => {
      state.allPosts.isLoading = false;
      state.allPosts.error = action.error.message || "Faild to get user posts";
    });
    // ----------------------------------------createPost--
    builder.addCase(createPost.pending, (state) => {
      state.allPosts.isLoading = true;
      state.allPosts.error = null;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.allPosts.isLoading = false;
        const newPost = action.payload;
        state.allPosts.posts = [newPost, ...state.allPosts.posts];
        state.userPosts.posts = [newPost, ...state.userPosts.posts];
      }
    );
    builder.addCase(createPost.rejected, (state, action: ActionErrorType) => {
      state.allPosts.isLoading = false;
      state.allPosts.error = action.error.message || "Faild to create post";
    });

    // ----------------------------------------updatePost--
    builder.addCase(updatePost.pending, (state) => {
      state.allPosts.isLoading = true;
      state.allPosts.error = null;
    });
    builder.addCase(
      updatePost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.allPosts.isLoading = false;
        const updatedPost = action.payload;
        state.allPosts.posts = state.allPosts.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        state.userPosts.posts = state.userPosts.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        state.bookMarks.posts = state.bookMarks.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      }
    );
    builder.addCase(updatePost.rejected, (state, action: ActionErrorType) => {
      state.allPosts.isLoading = false;
      state.allPosts.error = action.error.message || "Faild to update post";
    });
    // ----------------------------------------deletePost--
    builder.addCase(deletePost.pending, (state) => {
      state.allPosts.isLoading = true;
      state.allPosts.error = null;
    });
    builder.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.allPosts.isLoading = false;
        state.allPosts.posts = state.allPosts.posts.filter(
          (post) => post._id !== action.payload
        );
        state.userPosts.posts = state.userPosts.posts.filter(
          (post) => post._id !== action.payload
        );
        state.bookMarks.posts = state.bookMarks.posts.filter(
          (post) => post._id !== action.payload
        );
      }
    );
    builder.addCase(deletePost.rejected, (state, action: ActionErrorType) => {
      state.allPosts.isLoading = false;
      state.allPosts.error = action.error.message || "Faild to update post";
    });
  },
});

export const {
  incraseAllPostsPage,
  decraseAllPostsPage,
  setAllPostsPage,
  incraseUserPostsPage,
  decraseUserPostsPage,
  setUserPostsPage,
  incraseBookMarkPostsPage,
  decraseBookMarkPostsPage,
  setBookMarkPostsPage,
  setSelectedPost,
  resetPostError,
} = postSlice.actions;

export default postSlice.reducer;
