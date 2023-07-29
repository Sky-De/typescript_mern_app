import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";

// Takes data and turns that to JWT and returns it
export const tokenGenerator = (data) => JWT.sign(data, process.env.JWT_SECRET,{expiresIn: "3h"});

// Takes jwTOKEN and decodes it then returns EXPIRED or data
export const tokenDecoder = (token) => {
    let data
    JWT.verify(token, process.env.JWT_SECRET, function(err,decoded) {
        if(err) return data = "EXPIRED";
        if(decoded) return data = decoded;
    })
    return data;
};

// Takes password then returns hashed password
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

// Takes ID and checks if it is valid or not then returns Boolean 
export const mongooseIdValidator = (id) =>  mongoose.Types.ObjectId.isValid(id);

// ERR RESPONSES
export const ExpiredTokenResponse = (res) => res.status(403).json({message:"Your are not allowed (Token Is Expired) !"});
export const ForbiddenResponse = (res) => res.status(403).json({message:"Your are not allowed!"});
export const UnauthorizedResponse = (res) => res.status(401).json({message:"You must authenticate to get the requested response"});
export const NotFoundResponse = (res,err={}) => res.status(404).json({err,message:"There is no data for this ID"});

export const CatchResponse = (res,err={}) => {
    console.log(err);
    return res.status(500).json({err,message:"Server Error"});
}

// SUCCESS RESPONSES
export const SuccessResponse = (res,data={}) =>  res.status(200).json(data);
export const CreatedResponse = (res,data={}) => res.status(201).json(data);
   
