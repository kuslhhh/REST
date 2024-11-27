import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import router from "./router";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
    origin: true, // Allow requests from any origin. Update if needed for production.
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`✅ Server Running on http://localhost:${PORT}`);
});

// MongoDB connection
const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  console.error("❌ MONGO_URL is not defined in environment variables.");
  process.exit(1); // Exit if no MongoDB URL is found
}

mongoose.Promise = Promise;
mongoose
  .connect(mongoURL)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => {
    console.error("❌ Error connecting to the database:", error.message);
    process.exit(1); // Exit if the database connection fails
  });

mongoose.connection.on("error", (error: Error) =>
  console.error("❌ MongoDB connection error:", error.message)
);

// API Routes
app.use("/", router);
