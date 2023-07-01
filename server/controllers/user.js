import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
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

// --------------------------------------------------------------------------------------------------registerUser-----
export const registerUser =  async (req,res) => {
    const { name, email, password } = req.body;
    

    try {
        const userExist = await UserModel.findOne({email});
        if(userExist) return res.status(400).json({message: `There is exists an account with this email address already!`});
        
    } catch (err) {
        CatchResponse(res,err);
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const newUser = new UserModel({name, email, password:hashedPassword });
        await newUser.save();
        const token = tokenGenerator({ id: newUser._id, isAdmin: newUser.isAdmin });
        const { password, isAdmin, ...userData} = newUser._doc;
        return res.cookie("access_token", token, {httpOnly: true}).status(201).json(userData);
            
    } catch (err) {
        CatchResponse(res,err);
    }
};


// ----------------------------------------------------------------------------------------------------loginUser---
export const loginUser =  async (req,res) => {
    const { email } = req.body;
    
    try {
        const user = await UserModel.findOne({email});
        if(!user) return NotFoundResponse(res);
    
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return res.status(401).json(`Wrong Email/Password!!`);

        const token = tokenGenerator({ id: user._id, isAdmin: user.isAdmin });

        const { password, isAdmin, ...userData} = user._doc;
        return res.cookie("access_token", token, {httpOnly: true}).status(200).json(userData);
            
    } catch (err) {
        CatchResponse(res,err);
    }
};


// ---------------------------------------------------------------------------------------------------getUsers----
export const getUsers = async(req,res) => {
    try {
        const users = await UserModel.find();
        SuccessResponse(res,users)
    } catch (error) {
        CatchResponse(res,err);
    }
};

// ---------------------------------------------------------------------------------------------------updateUser----
export const updateUser = async(req,res) => {
    const newUser = req.body;
    const { userId } = req;
    
    // prevents updating isAdmin and password here
    if(newUser.isAdmin || newUser.password) return ForbiddenResponse(res);

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, newUser, {new: true});
        const { isAdmin, password, ...userData } = updatedUser._doc;
        CreatedResponse(res,userData);
    } catch (error) {
        CatchResponse(res,err);
    }
};

// ---------------------------------------------------------------------------------------------------updateUserPassword----
export const updateUserPassword = async(req,res) => {
    const { userId } = req;
    
    try {
        const user = await UserModel.findById(userId);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) return res.status(401).json(`Wrong Email/Password!!`); 

        const newHashedPass = hashPassword(req.body.newPassword);
        
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { password: newHashedPass },{new: true});
        const { isAdmin, password, ...userData } = updatedUser._doc;
        CreatedResponse(res,userData);
    } catch (err) {
        CatchResponse(res,err);
    }
};


// ---------------------------------------------------------------------------------------------------deleteUser----
export const deleteUser = async(req,res) => {
    const { userId } = req;

    if (!mongooseIdValidator(userId)) return NotFoundResponse(res);

    try {
        const userExist = await UserModel.findById(userId);
        if(!userExist) return NotFoundResponse(res);
        await UserModel.findByIdAndRemove(userId);
        return res.cookie("access_token", "{}", {httpOnly: true}).status(200).json({message: "User deleted!"});
    } catch (err) {
        CatchResponse(res,err);
    }
};


// -------------------------------------------------------------------------------------------------bookMarkPost----
export const bookMarkPost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    
    if(!mongooseIdValidator(id)) return NotFoundResponse(res);

    try {
        const user = await UserModel.findById(userId);
        const index = user.bookMarks.findIndex((postId) => postId === String(id));

        if(index === -1) user.bookMarks.push(id);
        else user.bookMarks = user.bookMarks.filter((postId) => postId !== id);

        const updatedUser = await UserModel.findByIdAndUpdate(userId, user, { new: true});
        const { password, isAdmin, ...userData} = updatedUser._doc;
        SuccessResponse(res,userData)
    } catch (err) {
        CatchResponse(res,err);
    }
};