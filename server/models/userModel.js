import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false},
    bookMarks: { type: [String], default: []},
    imgUrl: { type: String, default: ""},
    id: { type: String}
},{ timestamps: true });

export default mongoose.model("Users", userSchema);
