import mongoose, { Schema } from "mongoose";


const bookSchema = new Schema({
    name: { type: String, required: true},
    author: { type: String, required: true},
    desc: { type: String },
    coverUrl: { type: String},
    likes: {type: [String], default: []},
    ownerId: { type: String},
    id: { type: String}
})

export default mongoose.model("Books", bookSchema);