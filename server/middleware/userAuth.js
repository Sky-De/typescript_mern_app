import PostModel from "../models/postModel.js";
import { 
    CatchResponse, 
    ExpiredTokenResponse, 
    ForbiddenResponse, 
    NotFoundResponse, 
    mongooseIdValidator, 
    tokenDecoder 
} from "../funcs/index.js";

// -------------------------------------------------------------------------userAuth-----
export const userAuth = (req,res,next) => {
    const { access_token } = req.cookies;

    if(!access_token) return ForbiddenResponse(res);
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return ExpiredTokenResponse(res);


    if(!mongooseIdValidator(decodedData.id)) return ForbiddenResponse(res);
    req.userId = decodedData.id;
    next();
}

// --------------------------------------------------------------------------postOwnerAuth----
export const postOwnerAuth = async (req,res,next) => {
    const { access_token } = req.cookies;
    const { id } = req.params;

    if(!access_token) return ForbiddenResponse(res);
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return ExpiredTokenResponse(res);
    if(!mongooseIdValidator(decodedData.id)) return ForbiddenResponse(res);
    if(!mongooseIdValidator(id)) return NotFoundResponse(res);
    
    // full access for ADMIN
    if(decodedData.isAdmin) return next();

    try {
        const post = await PostModel.findById(id);
        if(!post) return NotFoundResponse(res);
        if(post.createdBy !== decodedData.id) return ForbiddenResponse(res);
        req.userId = decodedData.id;
        next();

    } catch (err) {
        return CatchResponse(res,err);
    }

}


// --------------------------------------------------------------------------userOwnerAuth----
export const userOwnerAuth = (req,res,next) => {
    const { access_token } = req.cookies;

    if(!access_token) return ForbiddenResponse(res);
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return ExpiredTokenResponse(res);
    if(!mongooseIdValidator(decodedData.id)) return ForbiddenResponse(res);
    
    req.userId = decodedData.id;
    if(req.userId) return next();
    else return ForbiddenResponse(res);
}


