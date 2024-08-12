import { Router } from "express";
import {
  createIncome,
  deleteIncome,
  editIncome,
  getIncomes,
  getIncomeById,
} from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const incomeRouter = Router();

incomeRouter.post("/add", verifyJWT, createIncome);
incomeRouter.get("/", verifyJWT, getIncomes);
incomeRouter.patch("/:id", verifyJWT, editIncome);
incomeRouter.delete("/:id", verifyJWT, deleteIncome);
incomeRouter.get("/:id", verifyJWT, getIncomeById);

export default incomeRouter;