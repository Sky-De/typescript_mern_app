import PostModel from "../models/postModel.js";
import { mongooseIdValidator, tokenDecoder } from "../funcs/index.js";

// better logic here --FIX
export const userAuth = (req,res,next) => {
    const { access_token } = req.cookies;

    if(!access_token) return res.status(401).json("You are not allowed!");
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return res.status(405).json("Token is expired!");


    if(!mongooseIdValidator(decodedData.id)) return res.status(401).json("You are not allowed!");
    req.userId = decodedData.id;
    next();
}

// better logic here --FIX
export const postOwnerAuth = async (req,res,next) => {
    const { access_token } = req.cookies;
    const { id } = req.params;

    if(!access_token) return res.status(401).json("You are not allowed!1");
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return res.status(405).json("Token is expired!");
    if(!mongooseIdValidator(decodedData.id)) return res.status(401).json("You are not allowed!");
    if(!mongooseIdValidator(id)) return res.status(401).json("No post with this ID!");
    
    // full access for ADMIN
    if(decodedData.isAdmin) return next();

    try {
        const post = await PostModel.findById(id);
        if(!post) return res.status(404).json("There is no post with this ID!");
        if(post.createdBy !== decodedData.id) return res.status(405).json("You are not allowed!3");
        req.userId = decodedData.id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(400).json("Something went wrong!1");
    }

}
