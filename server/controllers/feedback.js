import { isValidObjectId } from "mongoose";
import { SuccessResponse } from "../funcs/index.js";
import FeedbackModel from "../models/feedbackModel.js";
import UserModel from "../models/userModel.js";

// -------------------------------------------------------------------------------------------------getPosts----
//@desc gets all feedbacks
//@route GET /api/v1/feedback/feedbacks
//@access public

export const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    console.log(feedbacks);
    const feedbacksInfoArray = [];
    for (const item of feedbacks) {
      const creatorId = item.creatorId;
      const user = await UserModel.findById(creatorId);

      if (user) {
        const feedbackInfo = {
          creatorName: user.name,
          creatorImgUrl: user.imgUrl,
          createdAt: item.createdAt,
          feedback: item.feedback,
          _id: item._id,
        };
        feedbacksInfoArray.push(feedbackInfo);
      }
    }

    SuccessResponse(res, feedbacksInfoArray);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong at getFeedbacks catch block"));
  }
};

// -------------------------------------------------------------------------------------------------getPosts----
//@desc creates feedback
//@route POST /api/v1/feedback/create
//@access users

export const createFeedback = async (req, res, next) => {
  const feedback = req.body;
  try {
    const newFeedback = new FeedbackModel(feedback);
    await newFeedback.save();
    SuccessResponse(res, newFeedback);
  } catch (err) {
    res.status(500);
    return next(
      new Error("Some thing went wrong at createFeedback catch block")
    );
  }
};

// -------------------------------------------------------------------------------------------------getPosts----
//@desc deletes feedback
//@route DELETE /api/v1/feedback/:id/delete
//@access user admin
// (FIX-- needs adding adimin and user auth)

export const deleteFeedback = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.staus(404);
    next(new Error("Not found"));
  }
  try {
    const feedbackExists = await FeedbackModel.findById(id);
    if (!feedbackExists) {
      res.status(404);
      next(new Error("Not found"));
    }
    await FeedbackModel.findByIdAndRemove(id);
    SuccessResponse(res, {
      message: `feedback with ID : ${id} deleted successfully!`,
    });
  } catch (err) {
    res.status(500);
    return next(
      new Error("Some thing went wrong at createFeedback catch block")
    );
  }
};

// add delete and edit
