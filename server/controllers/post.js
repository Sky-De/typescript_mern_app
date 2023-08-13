import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import {
  CreatedResponse,
  SuccessResponse,
  mongooseIdValidator,
} from "../funcs/index.js";

// -------------------------------------------------------------------------------------------------getPosts----
//@desc gets all post
//@route GET /api/v1/post/posts
//@access public

export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    SuccessResponse(res, posts);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at gerPosts catch block"));
  }
};

// -------------------------------------------------------------------------------------------------getPostsByCount----
//@desc gets posts by postPerPage and currentPage
//@route GET /api/v1/post/posts/counted
//@access public

export const getPostsByCount = async (req, res, next) => {
  const { postPerPage = 10, currentPage = 1 } = req.body;

  try {
    const count = await PostModel.count();

    if (count <= postPerPage) {
      const posts = await PostModel.find().sort({ createdAt: -1 });
      return SuccessResponse(res, { count, posts });
    }

    const posts = await PostModel.find()
      .skip(currentPage * postPerPage - postPerPage)
      .limit(postPerPage)
      .sort({ createdAt: -1 });

    SuccessResponse(res, { count, posts });
  } catch (err) {
    res.status(500);
    return next(
      new Error("Some thing went wrong at getPostsByCount catch block")
    );
  }
};

// -------------------------------------------------------------------------------------------------getPost----
//@desc gets only one post by ID
//@route GET /api/v1/post/:id
//@access user - admin

export const getPost = async (req, res, next) => {
  const { id } = req.params;
  if (!mongooseIdValidator(id)) {
    res.status(404);
    return next(new Error("Post not found"));
  }

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      res.status(404);
      return next(new Error("Post not found"));
    }
    SuccessResponse(res, post);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at getPost catch block"));
  }
};

// -------------------------------------------------------------------------------------------------getUserPosts----
//@desc gets all posts of user
//@route GET /api/v1/post/:id
//@access user - admin
export const getUserPosts = async (req, res, next) => {
  const { currentPage = 1, postPerPage = 10 } = req.body;

  try {
    const count = await PostModel.find({
      createdBy: req.userId,
    }).count();
    if (count <= postPerPage) {
      const userPosts = await PostModel.find({
        createdBy: req.userId,
      }).sort({ createdAt: -1 });
      return SuccessResponse(res, { count, posts: userPosts });
    }
    const userPosts = await PostModel.find({ createdBy: req.userId })
      .skip(currentPage * postPerPage - postPerPage)
      .limit(postPerPage)
      .sort({ createdAt: -1 });
    SuccessResponse(res, { count, posts: userPosts });
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at getUserPosts catch block"));
  }
};

// --------------------------------------------------------------------------------------------------createPost---
//@desc create new post
//@route POST /api/v1/post/create
//@access user

export const createPost = async (req, res, next) => {
  const post = req.body;

  try {
    const newPost = new PostModel({
      ...post,
      createdBy: { _id: req.userId, name: req.userName },
    });
    await newPost.save();
    CreatedResponse(res, newPost);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at createPost catch block"));
  }
};

// --------------------------------------------------------------------------------------------------updatePost---
//@desc updates post
//@route POST /api/v1/post/:id/update
//@access user

export const updatePost = async (req, res, next) => {
  const newPost = req.body;
  const { id } = req.params;
  if (!mongooseIdValidator(id)) {
    res.status(400);
    return next(new Error("Not valid moongoId"));
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { ...newPost, id },
      { new: true }
    );
    CreatedResponse(res, updatedPost);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at updatePost catch block"));
  }
};

// --------------------------------------------------------------------------------------------------deletePost---
//@desc deletes post
//@route POST /api/v1/post/:id/delete
//@access user - admin

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  if (!mongooseIdValidator(id)) {
    res.status(400);
    return next(new Error("Not valid moongoId"));
  }
  try {
    const postExist = await PostModel.findById(id);
    if (!postExist) {
      res.status(404);
      return next(new Error("Post not found"));
    }
    await PostModel.findByIdAndRemove(id);
    SuccessResponse(res, { deleted: true, _id: id });
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at deletePost catch block"));
  }
};

// -------------------------------------------------------------------------------------------------getUserBookMarks----
//@desc gets posts which are user's bookmarks
//@route POST /api/v1/post/user/bookmarks
//@access user

export const getUserBookMarks = async (req, res, next) => {
  const { postPerPage = 10, currentPage = 1 } = req.body;

  try {
    const { bookMarks } = await UserModel.findById(req.userId);

    const count = await PostModel.find({ _id: { $in: bookMarks } }).count();
    if (count <= postPerPage) {
      const bookMarkPosts = await PostModel.find({
        _id: { $in: bookMarks },
      }).sort({ createdAt: -1 });
      return SuccessResponse(res, { count, posts: bookMarkPosts });
    }

    const bookMarkPosts = await PostModel.find({ _id: { $in: bookMarks } })
      .skip(currentPage * postPerPage - postPerPage)
      .limit(postPerPage)
      .sort({ createdAt: -1 });

    SuccessResponse(res, { count, posts: bookMarkPosts });
  } catch (err) {
    res.status(500);
    return next(
      new Error("Some thing went wrong at getUserBookMarks catch block")
    );
  }
};

// -------------------------------------------------------------------------------------------------likePost----
//@desc likes or removed like of post
//@route POST /api/v1/post/:id/like
//@access user

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  if (!mongooseIdValidator(id)) {
    res.status(400);
    return next(new Error("Not valid moongoId"));
  }

  try {
    const post = await PostModel.findById(id);
    const index = post.likes.findIndex((id) => id === String(userId));
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
    }
    const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    CreatedResponse(res, updatedPost.likes);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at likePost catch block"));
  }
};
