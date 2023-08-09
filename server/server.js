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
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser({ sameSite: "none", secure: true }));
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
