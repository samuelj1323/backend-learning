import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, resp) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
  const todos = getTodos.all(req.userId);
  resp.status(200).json(todos);
});

// Create a new todo
router.post("/", (req, resp) => {
  const { task } = req.body;
  const insertTodo = db.prepare(
    `INSERT INTO todos (user_id, task) VALUES(?, ?)`
  );
  const result = insertTodo.run(req.userId, task);

  resp.json({ id: result.lastInsertRowid, task, completed: 0 });
});

router.put("/:id", (req, resp) => {
  const { completed } = req.body;
  const { id } = req.params;
  const { page } = req.query;

  const updatedTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
  updatedTodo.run(completed, id);
  resp.json({ message: "Todo completed" });
});

router.delete("/:id", (req, resp) => {
  const { id } = req.params;
  const userId = req.userId;
  const deleteTodo = db.prepare(
    `DELETE FROM todos WHERE id = ? AND user_id = ?`
  );
  deleteTodo.run(id, userId);
  resp.json({ message: "Todo deleted" });
});

export default router;
