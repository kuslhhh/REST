import express from "express";
import authentication from "./authentication"; // Import the authentication routes

const router = express.Router();

// Attach all sub-routes
export default (): express.Router => {
  return router;
};
