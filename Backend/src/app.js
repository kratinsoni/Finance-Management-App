import express from "express";
import cors from "Cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); // setup to send and recieve cookies

import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import incomeRouter from "./routes/income.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/incomes", incomeRouter);

export { app };
