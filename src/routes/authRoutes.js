import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Save the user name and irreversibly encrypted password
  // Save The user@user.com | asdfasdfa;;laksdf

  //encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);
  // save new user and hashed password to the db
  try {
    const insertUser = db.prepare(`INSERT INTO users (username, password)
        VALUES (?, ?)`);
    const result = insertUser.run(username, hashedPassword);

    // Create a todo for them by default.
    const defaultTodo = `Hello! Add your first todo`;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES(?, ?)`);
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    //Create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Compare the two encrypted passwords
  console.log(`usrname: ${username}, pwd: ${password}`);
  res.sendStatus(200);
});

export default router;
