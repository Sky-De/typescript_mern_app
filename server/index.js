import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/user.js";
import bookRoutes from "./routes/post.js";

const app = express();
env.config();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use((req, res, next) => {
  const API_KEY = req.headers['x-api-key'];
  // Checks if the apiKey is valid
  if (API_KEY === process.env.API_KEY_A) {
    next(); 
  } else {
    res.status(401).json({ error: 'Invalid API key' });
  }
});
app.get("/", (req,res) =>  res.status(200).json("Welcome to my express server"));
// USER
app.use("/api/v1/user", authRoutes);
// POST
app.use("/api/v1/post", bookRoutes);
   

const PORT = process.env.PORT || 1313;

mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`)))
.catch((err) => console.log(err));




