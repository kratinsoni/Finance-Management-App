import { asyncHandler } from "../utilities/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", ""); //getting accessToken from cookies OR header

    // console.log(token);
    if (!token) {
      throw new Error("Unauthorized request");
    } //checking if token is available

    //comparing accessToken from currently retrieved accessToken from cookies
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //getting user from decoded token from cookies using _id
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error("Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new Error(error?.message || "Invalid access token");
  }
});
