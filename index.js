import express from "express";
import "./db/index.js";
import cors from "cors";
import "./models/index.js";
import rssFeedRouter from './routes/rssFeedRoute.js';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

// Statische Dateien bereitstellen
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use("/users", userRoute);
app.use("/roles", roleRoute);
app.use("/reviews", reviewRouter);
app.use("/placeCategories", placeCategoriesRouter);
app.use("/barriersReviews", barrierReviewRouter);
app.use("/barriers", barrierRouter);
app.use("/file-upload", FileRouter);
app.use("/profilePhotos", ProfilePhotosRouter);
app.use("/auth", authRouter);
app.use('/rss', rssFeedRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});