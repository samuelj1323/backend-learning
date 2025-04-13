import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, resp) => {});

// Create a new todo
router.post("/", (req, resp) => {});

router.put("/:id", (req, resp) => {});

router.delete("/:id", (req, resp) => {});

export default router;
