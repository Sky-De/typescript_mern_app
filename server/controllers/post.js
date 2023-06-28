import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import { hashPassword, mongooseIdValidator, tokenDecoder, tokenGenerator } from "../funcs/index.js";
 
export const getPosts = async (req, res) => {
    
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    if (!mongooseIdValidator(id)) return res.status(404).json({message:`No post with id: ${id}`});
    
    try {
        const post = await PostModel.findById(id);
        if(!post) return res.status(404).json({message:`No post with id: ${id}`});
        res.status(200).json(post);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}

export const getUserPosts = async (req, res) => {
    
    try {
        const posts = await PostModel.find({ createdBy: req.userId });
        res.status(200).json(posts);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    try {
        const newPost = new PostModel({ ...post, createdBy: req.userId });
        await newPost.save();
        res.status(200).json(newPost);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}

export const updatePost = async (req, res) => {
    const newPost = req.body;
    const { id } = req.params;
    if (!mongooseIdValidator(id)) return res.status(404).json({message:`No post with id: ${id}`});

    
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(id,{...newPost,id},{new: true});
        res.status(200).json(updatedPost);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongooseIdValidator(id)) return res.status(404).json({message:`No post with id: ${id}`});
    try {
        const postExist = await PostModel.findById(id);
        if(!postExist) return res.status(404).json({message: `No post with id: ${id}`});
        await PostModel.findByIdAndRemove(id);
        console.log("DONE DELETE");
        res.json({message:`Post with id ${id} deleted!`});
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}



export const test = async (req, res) => {
    const token = tokenGenerator({isAdmin:true,id:"12332443556"});
    const pass = hashPassword("123");
    const decodedToken = tokenDecoder(token);
    const isIdValid = mongooseIdValidator('649b63dd94136ed7069617');
    
    // console.log(token);
    // console.log(pass);
    // console.log(decodedToken);
    console.log(isIdValid);
    
    try {
        res.json("DONEEE");
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}



export const getUserBookMarks = async (req, res) => {
  
    try {
        const { bookMarks } = await UserModel.findById(req.userId);
        
        const bookMarkPosts = await PostModel.find({'_id': { $in: bookMarks } });
    
        res.status(200).json(bookMarkPosts);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}


export const bookMarkPost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    
    if(!mongooseIdValidator(id)) return res.status(404).json({message:`No post with id: ${id}`});
    // FIX
    try {
        const updatedUser = await UserModel.findByIdUpdate(userId, { $push: { bookMarks: id } },{ new: true});
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}


export const likePost = async (req,res) => {
    const { id } = req.params;
    const { userId } = req;
    if(!mongooseIdValidator(id)) return res.status(404).json({message:`No post with id: ${id}`});

    try {
        const post = await PostModel.findById(id);
        const index = post.likes.findIndex((id) => id === String(userId));
        if(index === -1) {
            post.likes.push(userId);
        }else{
            post.likes = post.likes.filter((id) => id !== String(userId));
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id,post,{new:true});
        res.status(201).json(updatedPost);

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}