import { Expense } from "../models/expense.model.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description } = req.body;

  if (!title || !amount || !category || !description) {
    res.status(400);
    throw new Error("All Fields are Required");
  }

  const expense = await Expense.create({
    title,
    amount,
    category,
    description,
    owner: req.user._id,
  });

  if (!expense) {
    res.status(400);
    throw new Error("Expense Creation Failed");
  }

  res.status(201).json({
    _id: expense._id,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.createdAt,
    description: expense.description,
  });
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense Not Found");
  }

  if (expense.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not Authorized to Delete this Expense");
  }

  await Expense.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Expense Deleted Successfully" });
});

const editExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description } = req.body;

  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense Not Found");
  }

  if (expense.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not Authorized to Edit this Expense");
  }

  expense.title = title || expense.title;
  expense.amount = amount || expense.amount;
  expense.category = category || expense.category;
  expense.description = description || expense.description;

  await expense.save();

  res.status(200).json({
    _id: expense._id,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.updatedAt,
    description: expense.description,
  });
});

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ owner: req.user._id });

  if (!expenses) {
    res.status(404);
    throw new Error("No Expenses Found");
  }

  res.status(200).json(expenses);
});

const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense Not Found");
  }

  if (expense.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not Authorized to View this Expense");
  }

  res.status(200).json(expense);
});

export { createExpense, deleteExpense, editExpense, getExpenses, getExpenseById };
