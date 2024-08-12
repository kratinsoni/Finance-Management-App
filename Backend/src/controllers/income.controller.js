import { Income } from "../models/income.model.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

const createIncome = asyncHandler(async (req, res) => {
  const { amount, description, category } = req.body;

  if (!amount || !description || !category) {
    res.status(400);
    throw new Error("All Fields are Required");
  }

  const income = await Income.create({
    amount,
    description,
    category,
    owner: req.user._id,
  });

  if (!income) {
    res.status(400);
    throw new Error("Income Creation Failed");
  }

  res.status(201).json({
    _id: income._id,
    amount: income.amount,
    description: income.description,
    category: income.category,
    date: income.createdAt,
  });
});

const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    res.status(404);
    throw new Error("Income Not Found");
  }

  if (income.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not Authorized to Delete this Income");
  }

  await Income.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Income Deleted Successfully" });
});

const editIncome = asyncHandler(async (req, res) => {
  const { amount, description, category } = req.body;

  const income = await Income.findById(req.params.id);

  if (!income) {
    res.status(404);
    throw new Error("Income Not Found");
  }

  if (income.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not Authorized to Edit this Income");
  }

  income.amount = amount || income.amount;
  income.description = description || income.description;
  income.category = category || income.category;

  await income.save();

  res.status(200).json({
    _id: income._id,
    amount: income.amount,
    description: income.description,
    category: income.category,
    date: income.updatedAt,
  });
});

const getIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find({ owner: req.user._id });

  if (!incomes) {
    res.status(404);
    throw new Error("Incomes Not Found");
  }

  res.status(200).json(incomes);
});

const getIncomeById = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    res.status(404);
    throw new Error("Income Not Found");
  }

  if (income.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not Authorized to View this Income");
  }

  res.status(200).json({
    _id: income._id,
    amount: income.amount,
    description: income.description,
    category: income.category,
    date: income.createdAt,
  });
});

export { createIncome, deleteIncome, editIncome, getIncomes, getIncomeById };
