import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import {
  CatchResponse,
  ExpiredTokenResponse,
  ForbiddenResponse,
  NotFoundResponse,
  SuccessResponse,
  mongooseIdValidator,
  tokenDecoder,
} from "../funcs/index.js";

// -------------------------------------------------------------------------userAuth-----
export const userAuth = (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token) return ForbiddenResponse(res);
  const decodedData = tokenDecoder(access_token);
  if (decodedData === "EXPIRED") return ExpiredTokenResponse(res);

  if (!mongooseIdValidator(decodedData.id)) return ForbiddenResponse(res);
  req.userId = decodedData.id;
  // may remove FIX
  req.userName = decodedData.name;
  next();
};

// --------------------------------------------------------------------------postOwnerAuth----
export const postOwnerAuth = async (req, res, next) => {
  const { access_token } = req.cookies;
  const { id } = req.params;

  if (!access_token) return ForbiddenResponse(res);
  const decodedData = tokenDecoder(access_token);
  if (decodedData === "EXPIRED") return ExpiredTokenResponse(res);
  if (!mongooseIdValidator(decodedData.id)) return NotFoundResponse(res);
  if (!mongooseIdValidator(id)) return NotFoundResponse(res);

  // full access for ADMIN
  if (decodedData.isAdmin) return next();

  try {
    const post = await PostModel.findById(id);
    if (!post) return NotFoundResponse(res);
    if (post.createdBy !== decodedData.id) return ForbiddenResponse(res);
    req.userId = decodedData.id;
    req.userName = decodedData.name;
    next();
  } catch (err) {
    return CatchResponse(res, err);
  }
};

// --------------------------------------------------------------------------userOwnerAuth----
export const userOwnerAuth = async (req, res, next) => {
  const { access_token } = req.cookies;
  const { id } = req.params;

  if (!access_token) return ForbiddenResponse(res);
  const decodedData = tokenDecoder(access_token);
  if (decodedData === "EXPIRED") {
    res;
    return ExpiredTokenResponse(res);
  }
  if (!mongooseIdValidator(decodedData.id)) return ForbiddenResponse(res);

  try {
    const user = await UserModel.findById(decodedData.id);
    if (!user) {
      res.staus(404);
      return next(new Error("User not found"));
    }

    if (decodedData.id === id || user.isAdmin) {
      req.userId = id;
    } else {
      res.status(401);
      return next(new Error("You are not allowed for this action"));
    }
  } catch (error) {
    res.status(500);
    return next(
      new Error("Some thing went wrong on userOwnerAuth catch block")
    );
  }

  if (req.userId) return next();
  else {
    res.status(401);
    return next(new Error("You are not allowed for this action"));
  }
};
