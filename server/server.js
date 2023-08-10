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
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log(res.header);

  // // Request methods you wish to allow
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  // );

  // // Request headers you wish to allow
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type"
  // );

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // // Pass to next layer of middleware
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
