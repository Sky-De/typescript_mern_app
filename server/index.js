import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/post.js";

const app = express();
env.config();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.get("/", (req,res) =>  res.status(200).json("Welcome to my express server"));
// AUTH
app.use("/api/v1/auth", authRoutes);
// POST
app.use("/api/v1/post", bookRoutes);
   

const PORT = process.env.PORT || 1313;

mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`)))
.catch((err) => console.log(err));




