
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";

export const tokenGenerator = (data) => JWT.sign(data, process.env.JWT_SECRET,{expiresIn: "3h"});

export const tokenDecoder = (token) => {
    let data
    JWT.verify(token, process.env.JWT_SECRET, function(err,decoded) {
        if(err) return data = "EXPIRED";
        if(decoded) return data = decoded;
    })
    return data;
};

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const mongooseIdValidator = (id) =>  mongoose.Types.ObjectId.isValid(id);

