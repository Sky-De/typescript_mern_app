import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


export const registerUser =  async (req,res) => {
    console.log("now");
    const { name, email, password, isAdmin } = req.body;

    try {
        const userExist = await UserModel.findOne({email});
        if(userExist) return res.status(400).json({message: `account with email : ${email}  already exists!`});
        
    } catch (err) {
        console.log(err);
        res.status(400).json("Something went wrong!")
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const newUser = new UserModel({name, email, password:hashedPassword});
        await newUser.save();
        const token = JWT.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
        const { password, isAdmin, ...userData} = newUser._doc;
        return res.cookie("access_token", token, {httpOnly: true}).status(201).json(userData);
            
    } catch (err) {
        console.log(err);
        res.status(400).json("Something went wrong!")
        
    }
}

export const loginUser =  async (req,res) => {
    const { email } = req.body;
    
    try {
        const user = await UserModel.findOne({email});
        if(!user) return res.status(404).json(`There is no user with this data!`);
    
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return res.status(401).json(`Wrong Email/Password!!`);

        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        const { password, isAdmin, ...userData} = user._doc;
        return res.cookie("access_token", token, {httpOnly: true}).status(201).json(userData);
            
    } catch (err) {
        console.log(err);
        res.status(400).json("Something went wrong!");
    }
}