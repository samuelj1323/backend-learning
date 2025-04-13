import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, resp) => {
  resp.status(201);
});
router.post("/login", (req, resp) => {
  resp.status(200);
});

export default router;
