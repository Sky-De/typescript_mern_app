import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";
import { 
    CatchResponse, 
    CreatedResponse, 
    ForbiddenResponse, 
    NotFoundResponse, 
    SuccessResponse, 
    hashPassword, 
    mongooseIdValidator, 
    tokenGenerator 
} from "../funcs/index.js";
import mongoose from "mongoose";


// --------------------------------------------------------------------------------------------------registerUser-----
//@desc creates new user
//@route POST api/v1/user/register
//@access puplic

export const registerUser =  async (req,res, next) => {
    const { name, email, password } = req.body;
    
    try {
        const userExist = await UserModel.findOne({email});
        if(userExist) {
            res.status(404);
            return next(new Error("There is exist an account with this email address already "));
        }
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on registerUser/check existing user catch block!"));
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const newUser = new UserModel({name, email, password:hashedPassword });
        await newUser.save();
        const token = tokenGenerator({ id: newUser._id, isAdmin: newUser.isAdmin, name: newUser.name });
        const { password, isAdmin, ...userData} = newUser._doc;
        return res.cookie("access_token", token, { httpOnly: true }).status(201).json(userData);
            
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on registerUser/createUser catch block!"));
    }
};




// ----------------------------------------------------------------------------------------------------loginUser---
//@desc logs user in
//@route POST api/v1/user/login
//@access puplic

export const loginUser =  async (req,res,next) => {
    const { email } = req.body;
    
    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            res.status(404);
            return next(new Error("User not found!"))
        }
    
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) {
            res.status(400);
            return next(new Error("Password or user Email is wrong!!"));
        }

        const token = tokenGenerator({ id: user._id, isAdmin: user.isAdmin, name: user.name });

        const { password, isAdmin, ...userData} = user._doc;
        
        return res.cookie("access_token", token, { httpOnly: true }).status(200).json(userData);
       
            
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on loginUser catch block!"));
    }
};



// ----------------------------------------------------------------------------------------------------logoutUser---
//@desc logs user out
//@route POST api/v1/user/logout
//@access user 

export const logoutUser =  async (req,res) => {
    
    try {

        return res.cookie("access_token", "", { httpOnly: true }).status(200).json({message: "User logout DONE!"});
             
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on logoutUser catch block!"));
    }
};




// ---------------------------------------------------------------------------------------------------getUsers----
//@desc gets all users
//@route GET api/v1/user/users
//@access admin only

export const getUsers = async(req,res) => {
    try {
        const users = await UserModel.find();
        SuccessResponse(res,users)
    } catch (error) {
        res.status(500);
        return next(new Error("Some thing went wrong on getUsers catch block!"));
    }
};




// ---------------------------------------------------------------------------------------------------updateUser----
//@desc updates user
//@route POST api/v1/user/update
//@access admin - user

export const updateUser = async(req,res) => {
    const newUser = req.body;
    const { userId } = req;
    
    // prevents updating isAdmin and password here
    if(newUser.isAdmin || newUser.password) {
        res.status(403);
        return next(new Error("You are not allowed for this action!"));
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, newUser, {new: true});
        const { isAdmin, password, ...userData } = updatedUser._doc;
        CreatedResponse(res,userData);
    } catch (error) {
        res.status(500);
        return next(new Error("Some thing went wrong on updateUsers catch block!"));
    }
};




// ---------------------------------------------------------------------------------------------------updateUserPassword----
//@desc updates user password
//@route POST /api/v1/user/update/password
//@access admin - user

export const updateUserPassword = async(req,res,next) => {
    const { userId } = req;
    
    try {
        const user = await UserModel.findById(userId);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) {
            res.status(401);
            return next(new Error("Wrong password!!"));
        }

        const newHashedPass = hashPassword(req.body.newPassword);
        
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { password: newHashedPass },{new: true});
        const { isAdmin, password, ...userData } = updatedUser._doc;
        CreatedResponse(res,userData);
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on updateUserPassword catch block!"));
    }
};




// ---------------------------------------------------------------------------------------------------deleteUser----
//@desc deletes user and all posts created by user
//@route POST /api/v1/user/:id/delete
//@access user - admin

export const deleteUser = async(req,res,next) => {

    try {
        const userExist = await UserModel.findById(req.userId);
        if(!userExist) {
            res.status(404);
            return next(new Error("User not found!"));
        }
        // prevents deleteing admin account--temp-FIX
        if(userExist.isAdmin) {
            res.status(403);
            return next(new Error("You are not allowed for this action."));
        }

        await PostModel.deleteMany({ "createdBy._id": req.userId });
        await UserModel.findByIdAndRemove(req.userId);
        return res.cookie("access_token", "{}", {httpOnly: true}).status(200).json({message: "User deleted!"});
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on deleteUser catch block!"));
    }
};




// -------------------------------------------------------------------------------------------------bookMarkPost----
//@desc toggles post id in user's bookMarks array 
//@route POST /api/v1/user/:id/bookmark
//@access user

export const bookMarkPost = async (req, res,next) => {
    const { id } = req.params;
    const { userId } = req;
    
    if(!mongooseIdValidator(id)) {
        res.staus(404);
        return next(new Error("Not valid mogoose ID"))
    }

    try {
        const user = await UserModel.findById(userId);
        const index = user.bookMarks.findIndex((postId) => postId === String(id));

        if(index === -1) user.bookMarks.push(id);
        else user.bookMarks = user.bookMarks.filter((postId) => postId !== id);

        const updatedUser = await UserModel.findByIdAndUpdate(userId, user, { new: true});
        const { password, isAdmin, ...userData} = updatedUser._doc;
        SuccessResponse(res,userData)
    } catch (err) {
        res.status(500);
        return next(new Error("Some thing went wrong on deleteUser catch block!"));
    }
};