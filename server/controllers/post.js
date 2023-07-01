import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import { 
    CatchResponse, 
    CreatedResponse, 
    NotFoundResponse, 
    SuccessResponse, 
    mongooseIdValidator  
} from "../funcs/index.js";
   
// -------------------------------------------------------------------------------------------------getPosts---- 
export const getPosts = async (req, res) => {
    
    try {
        const posts = await PostModel.find();
        SuccessResponse(res,posts)
        
    } catch (err) {
        CatchResponse(res,err)
    }
};

// -------------------------------------------------------------------------------------------------getPost----
export const getPost = async (req, res) => {
    const { id } = req.params;
    if (!mongooseIdValidator(id)) return NotFoundResponse(res);
    
    try {
        const post = await PostModel.findById(id);
        if(!post) return NotFoundResponse(res);
        SuccessResponse(res,post)
        
    } catch (err) {
        CatchResponse(res,err)
    }
};

// -------------------------------------------------------------------------------------------------getUserPosts----
export const getUserPosts = async (req, res) => {
    
    try {
        const posts = await PostModel.find({ createdBy: req.userId });
        SuccessResponse(res,posts)
        
    } catch (err) {
        CatchResponse(res,err)
    }
};

// --------------------------------------------------------------------------------------------------createPost---
export const createPost = async (req, res) => {
    const post = req.body;
    
    try {
        const newPost = new PostModel({ ...post, createdBy: req.userId });
        await newPost.save();
        CreatedResponse(res,newPost)
        
    } catch (err) {
        CatchResponse(res,err)
    }
};

// --------------------------------------------------------------------------------------------------updatePost---
export const updatePost = async (req, res) => {
    const newPost = req.body;
    const { id } = req.params;
    if (!mongooseIdValidator(id)) return NotFoundResponse(res);

    
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(id,{...newPost,id},{new: true});
        CreatedResponse(res,updatedPost);
        
    } catch (err) {
        CatchResponse(res,err)
    }
};

// --------------------------------------------------------------------------------------------------deletePost---
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongooseIdValidator(id)) return NotFoundResponse(res);
    try {
        const postExist = await PostModel.findById(id);
        if(!postExist) return NotFoundResponse(res);
        await PostModel.findByIdAndRemove(id);
        SuccessResponse(res,{message:`Post with id ${id} deleted!`});
        
    } catch (err) {
        CatchResponse(res,err)
    }
};


// -------------------------------------------------------------------------------------------------getUserBookMarks----
export const getUserBookMarks = async (req, res) => {
  
    try {
        const { bookMarks } = await UserModel.findById(req.userId);
        
        const bookMarkPosts = await PostModel.find({'_id': { $in: bookMarks } });
    
        SuccessResponse(res,bookMarkPosts)
    } catch (err) {
        CatchResponse(res,err);
    }
};




// -------------------------------------------------------------------------------------------------likePost----
export const likePost = async (req,res) => {
    const { id } = req.params;
    const { userId } = req;
    if(!mongooseIdValidator(id)) return NotFoundResponse(res);

    try {
        const post = await PostModel.findById(id);
        const index = post.likes.findIndex((id) => id === String(userId));
        if(index === -1) {
            post.likes.push(userId);
        }else{
            post.likes = post.likes.filter((id) => id !== String(userId));
        }
        const updatedPost = await PostModel.findByIdAndUpdate(id,post,{new:true});
        CreatedResponse(res,updatedPost)

    } catch (err) {
        CatchResponse(res,err);
    }
};