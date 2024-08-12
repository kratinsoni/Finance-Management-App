import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getTotalIncomeAndExpense,
  getUserProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/resetpassword", verifyJWT, resetPassword);
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/totalincomeexpense", verifyJWT, getTotalIncomeAndExpense);
userRouter.get("/profile", verifyJWT, getUserProfile);

export default userRouter;