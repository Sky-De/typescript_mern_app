import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
    title: { type: String, required: true},
    bookAuthor: { type: String, required: true},
    desc: { type: String },
    coverUrl: { type: String},
    likes: {type: [String], default: []},
    createdBy: { type: String},
    id: { type: String}
},{ timestamps: true })

export default mongoose.model("Posts", postSchema);