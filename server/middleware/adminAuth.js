import { tokenDecoder } from "../funcs/index.js";

export const adminAuth = (req,res,next) => {
    const { access_token } = req.cookies;

    if(!access_token) return res.status(401).json("No access!");
    const decodedData = tokenDecoder(access_token);
    if(decodedData === "EXPIRED") return res.status(405).json("Token is expired!");
    if(!decodedData.isAdmin) return res.status(401).json("No access!");
    next();
}