import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRouter from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running at port: ", PORT);
  });
});
