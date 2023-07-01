import { ExpiredTokenResponse, ForbiddenResponse, tokenDecoder } from "../funcs/index.js";

export const adminAuth = (req,res,next) => {
    const { access_token } = req.cookies;

    if(!access_token) return ForbiddenResponse(res);
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return ExpiredTokenResponse(res);
    if(!decodedData.isAdmin) return ForbiddenResponse(res);
    next();
}