import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

router.get("/", async (req, resp) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  resp.status(200).json(todos);
});

// Create a new todo
router.post("/", async (req, resp) => {
  const { task } = req.body;
  const todo = await prisma.todo.create({
    data: {
      task,
      userId: req.userId,
    },
  });

  resp.json(todo);
});

router.put("/:id", async (req, resp) => {
  const { completed } = req.body;
  const { id } = req.params;
  const { page } = req.query;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
    data: {
      completed: !!completed,
    },
  });
  resp.json(updatedTodo);
});

router.delete("/:id", async (req, resp) => {
  const { id } = req.params;
  const userId = req.userId;
  await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId,
    },
  });
  resp.json({ message: "Todo deleted" });
});

export default router;
