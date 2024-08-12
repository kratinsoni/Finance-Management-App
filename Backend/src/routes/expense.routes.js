import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  editExpense,
  getExpenses,
  getExpenseById,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const expenseRouter = Router();

expenseRouter.post("/add", verifyJWT, createExpense);
expenseRouter.get("/", verifyJWT, getExpenses);
expenseRouter.patch("/:id", verifyJWT, editExpense);
expenseRouter.delete("/:id", verifyJWT, deleteExpense);
expenseRouter.get("/:id", verifyJWT, getExpenseById);

export default expenseRouter;
