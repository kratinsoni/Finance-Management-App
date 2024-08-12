import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      error.message || "Access and Refresh Token Generation Failed"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, fullName, username } = req.body;

  if (!email || !password || !fullName || !username) {
    res.status(400);
    throw new Error("All Fields are Required");
  }

  const createdUser = await User.findOne({ username });

  if (createdUser) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({ email, password, fullName, username });

  if (!user) {
    res.status(400);
    throw new Error("User Registration Failed");
  }

  res.status(201).json({
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    username: user.username,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if ((!username && !email) || !password) {
    res.status(400);
    throw new Error("Username or Email and Password are Required");
  }

  let user;

  if (username) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ email });
  }
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  const isPasswordMatch = await user.verifyPassword(password);

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  if (!accessToken || !refreshToken) {
    res.status(400);
    throw new Error("Token Generation Failed");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      accessToken,
      refreshToken,
    });
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  //clearing cookies after logout
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json("User Logged Out");
});

const resetPassword = asyncHandler(async (req, res) => {
  const { username, password, newPassword } = req.body;

  if (!username || !password || !newPassword) {
    res.status(400);
    throw new Error("All Fields are Required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  if (user._id.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("Invalid User");
  }

  const isPasswordMatch = await user.verifyPassword(password);

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: newPassword,
    },
    {
      new: true,
    }
  );

  if(!updatedUser) {
    res.status(400);
    throw new Error("Password Reset Failed");
  }

  console.log("password reset")

  res.status(200).json({
    message: "Password Reset Successfully",
  });
});

const getTotalIncomeAndExpense = asyncHandler(async (req, res) => {
  const totalIncome = await Income.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpense = await Expense.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $group: {
        _id: null,
        totalExpense: { $sum: "$amount" },
      },
    },
  ]);

  res.status(200).json({
    totalIncome: totalIncome[0]?.totalIncome || 0,
    totalExpense: totalExpense[0]?.totalExpense || 0,
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  res.status(200).json({
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    username: user.username,
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getTotalIncomeAndExpense,
  getUserProfile,
};
