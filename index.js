import express from "express";
import "./db/index.js";
import cors from "cors";
import "./models/index.js";
import userRoute from "./routes/usersRoute.js";
import roleRoute from "./routes/rolesRoute.js";
import reviewRouter from "./routes/reviewsRoute.js";
import placeCategoriesRouter from "./routes/placeCategoriesRoute.js";
import barrierReviewRouter from "./routes/barriersReviewsRoute.js";
import barrierRouter from "./routes/barriersRoute.js";
import FileRouter from "./routes/fileUploadsRoute.js";
import ProfilePhotosRouter from "./routes/profilePhotosRoute.js";
import authRouter from "./routes/authRoute.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static("uploads"));

app.use("/users", userRoute);
app.use("/roles", roleRoute);
app.use("/reviews", reviewRouter);
app.use("/placeCategories", placeCategoriesRouter);
app.use("/barriersReviews", barrierReviewRouter);
app.use("/barriers", barrierRouter);
app.use("/file-upload", FileRouter);
app.use("/profilePhotos", ProfilePhotosRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
