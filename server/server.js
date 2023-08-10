import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/user.js";
import bookRoutes from "./routes/post.js";
import { connectDb } from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

env.config();
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
    sameSite: "none",
    secure: true,
  })
);

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://sprightly-baklava-7dd4f2.netlify.app",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Other CORS headers and settings if needed

  next();
});

app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) =>
  res.status(200).json("Welcome to my express server")
);
// USER
app.use("/api/v1/user", authRoutes);
// POST
app.use("/api/v1/post", bookRoutes);
// ERROR
app.use(errorHandler);

const PORT = process.env.PORT || 1313;

connectDb()
  .then(() =>
    app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`))
  )
  .catch((err) => console.log(err));
