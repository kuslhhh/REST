import express from "express";
import { registerUser } from "../controllers/authentication";

const router = express.Router();

// Register user route
router.post("/register", registerUser);

router.get("/ping", (req, res) => {
    res.send("Server is working!");
  });  

export default router;
