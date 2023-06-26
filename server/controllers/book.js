import JWT from "jsonwebtoken";
import BookModel from "../models/bookModel.js";

export const getBooks = async (req, res) => {
    
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}

export const createBook = async (req, res) => {
    const book = req.body;
    const { access_token } = req.cookies;

    if(!access_token) return res.status(401).json("You are not allowed!");
    const decodedData = JWT.verify(access_token, process.env.JWT_SECRET);
    console.log(decodedData);


    try {
        const newBook = new BookModel({ ...book, ownerId: decodedData.id });
        await newBook.save();
        res.status(200).json(newBook);
        
    } catch (err) {
        console.log(err);
        res.status(400).json("SomeThing went wrong!");
    }
}
