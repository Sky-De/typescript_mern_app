import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import {
  CreatedResponse,
  SuccessResponse,
  hashPassword,
  mongooseIdValidator,
  tokenGenerator,
  verifyTokenGenerator,
} from "../funcs/index.js";

// --------------------------------------------------------------------------------------------------registerUser-----
//@desc creates new user
//@route POST api/v1/user/register
//@access puplic

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const mailExist = await UserModel.findOne({ email });
    const nameExist = await UserModel.findOne({ name });
    if (mailExist) {
      res.status(404);
      return next(
        new Error("There is an account with this email address already!")
      );
    }

    if (nameExist) {
      res.status(404);
      return next(new Error("This name is already taken!"));
    }
  } catch (err) {
    res.status(500);
    return next(
      new Error(
        "Some thing went wrong on registerUser/check existing user catch block!"
      )
    );
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    const token = tokenGenerator({
      id: newUser._id,
      isAdmin: newUser.isAdmin,
      name: newUser.name,
    });
    const { password, lastMail, isAdmin, ...userData } = newUser._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .json(userData);
  } catch (err) {
    res.status(500);
    return next(
      new Error("Some thing went wrong on registerUser/createUser catch block!")
    );
  }
};

// ----------------------------------------------------------------------------------------------------loginUser---
//@desc logs user in
//@route POST api/v1/user/login
//@access puplic

export const loginUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404);
      return next(new Error("User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(400);
      return next(new Error("Password or user Email is wrong!!"));
    }

    const token = tokenGenerator({
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
    });

    const { password, lastMail, isAdmin, ...userData } = user._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(userData);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong on loginUser catch block!"));
  }
};

// ----------------------------------------------------------------------------------------------------logoutUser---
//@desc logs user out
//@route POST api/v1/user/logout
//@access user

export const logoutUser = async (req, res, next) => {
  try {
    return res
      .cookie("access_token", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "User logout DONE!" });
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong on logoutUser catch block!"));
  }
};

// ---------------------------------------------------------------------------------------------------getUsers----
//@desc gets post owner name
//@route GET api/v1/user/:id/name
//@access admin only

export const getPostOwnerInfo = async (req, res, next) => {
  const { id } = req.params;
  if (!mongooseIdValidator(id)) {
    res.status(404);
    return next(new Error("User not found"));
  }
  try {
    const user = await UserModel.findById(id);
    SuccessResponse(res, { name: user.name, imgUrl: user.imgUrl });
  } catch (error) {
    res.status(500);
    return next(
      new Error("Some thing went wrong on getPostOwnerName catch block!")
    );
  }
};
// ---------------------------------------------------------------------------------------------------getUsers----
//@desc gets all users
//@route GET api/v1/user/users
//@access admin only

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    SuccessResponse(res, users);
  } catch (error) {
    res.status(500);
    return next(new Error("Some thing went wrong on getUsers catch block!"));
  }
};

// ---------------------------------------------------------------------------------------------------updateUser----
//@desc updates user
//@route POST api/v1/user/update
//@access admin - user

export const updateUser = async (req, res, next) => {
  const newUser = req.body;
  const { id } = req.params;
  console.log(id);

  // prevents updating isAdmin and password here
  if (newUser.isAdmin || newUser.password) {
    res.status(401);
    return next(new Error("You are not allowed for this action!"));
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    const { isAdmin, lastMail, password, ...userData } = updatedUser._doc;
    CreatedResponse(res, userData);
  } catch (error) {
    res.status(500);
    return next(new Error("Some thing went wrong on updateUsers catch block!"));
  }
};

// ---------------------------------------------------------------------------------------------------updateUserPassword----
//@desc updates user password
//@route POST /api/v1/user/update/password
//@access admin - user

export const updateUserPassword = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(401);
      return next(new Error("Wrong password!!"));
    }

    const newHashedPass = hashPassword(req.body.newPassword);

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { password: newHashedPass },
      { new: true }
    );
    const { isAdmin, lastMail, password, ...userData } = updatedUser._doc;
    CreatedResponse(res, userData);
  } catch (err) {
    res.status(500);
    return next(
      new Error("Some thing went wrong on updateUserPassword catch block!")
    );
  }
};

// ---------------------------------------------------------------------------------------------------deleteUser----
//@desc deletes user and all posts created by user
//@route POST /api/v1/user/:id/delete
//@access user - admin

export const deleteUser = async (req, res, next) => {
  try {
    const userExist = await UserModel.findById(req.userId);
    console.log(userExist);
    if (!userExist) {
      res.status(404);
      return next(new Error("User not found!"));
    }

    // prevents deleteing admin account--temp-FIX
    if (userExist.isAdmin) {
      res.status(401);
      return next(new Error("You are not allowed for this action."));
    }

    console.log("here");

    await PostModel.deleteMany({ createdBy: req.userId });
    await UserModel.findByIdAndRemove(req.userId);
    return res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    console.log("here errr");
    res.status(500);
    return next(new Error("Some thing went wrong on deleteUser catch block!"));
  }
};

// -------------------------------------------------------------------------------------------------bookMarkPost----
//@desc toggles post id in user's bookMarks array
//@route POST /api/v1/user/:id/bookmark
//@access user

export const bookMarkPost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  if (!mongooseIdValidator(id)) {
    res.staus(404);
    return next(new Error("Not valid mogoose ID"));
  }

  try {
    const user = await UserModel.findById(userId);
    const index = user.bookMarks.findIndex((postId) => postId === String(id));

    if (index === -1) user.bookMarks.push(id);
    else user.bookMarks = user.bookMarks.filter((postId) => postId !== id);

    const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
    const { password, isAdmin, ...userData } = updatedUser._doc;
    SuccessResponse(res, userData);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong on deleteUser catch block!"));
  }
};

// -------------------------------------------------------------------------------------------------verifyUser----
//@desc verifies User based on verify code which have sended to user email
//@route POST /api/v1/user/:id/verify
//@access user

export const verifyUser = async (req, res, next) => {
  const { id } = req.params;
  const { verifyCode } = req.body;

  try {
    const user = await UserModel.findById(id);

    if (!user.lastMail) {
      res.status(400);
      next(new Error("You must first click on send mail button!"));
    }
    if (!user) {
      res.status(404);
      return next(new Error("User not found!"));
    }
    if (verifyCode !== user.lastMail.verifyCode) {
      res.status(401);
      return next(new Error("Wrong verify code!"));
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    const { password, lastMail, isAdmin, ...userData } = updatedUser._doc;
    SuccessResponse(res, userData);
  } catch (err) {
    res.status(500);
    return next(new Error("Some thing went wrong on verifyUser catch block!"));
  }
};

// -------------------------------------------------------------------------------------------------sendMail----
//@desc sends verifyCode via email and sets it in user obj verifyCode
//@route GET /api/v1/user/:id/verify/email
//@access user

export const sendVerifyEmail = async (req, res, next) => {
  const { id } = req.params;
  console.log("im here");

  try {
    const user = await UserModel.findById(id);
    const TOKEN = verifyTokenGenerator();
    await UserModel.findByIdAndUpdate(
      id,
      { lastMail: { verifyCode: TOKEN } },
      { new: true }
    );

    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASS,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: `${user.name}`,
        intro:
          "BookShare app verification, if you did not ask for this email ignore it, otherwise use token to verify your email.",
        table: {
          data: [
            {
              title: "verify token",
              payload: TOKEN,
            },
          ],
        },
        // outro: "Have fun with BookShareApp :)",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify Email",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        res.header(
          "Access-Control-Allow-Origin",
          "https://puce-worried-barnacle.cyclic.app/api/v1/"
        );
        return (
          res
            // .header("Access-Control-Allow-Origin", "*")
            .status(201)
            .json({ msg: "Verify code sended to your email!" })
        );
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        return next(new Error("Something went wrong in sendMail catch block"));
      });
  } catch (error) {
    res.status(500);
    console.log(error);
    next(new Error("Something went wrong in sendVerifyEmail catch block"));
  }
};
