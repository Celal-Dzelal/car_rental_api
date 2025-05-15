"use strict";

const CustomError = require("../errors/customError");
const User = require("../models/user");
const passwordEncrypt = require("./passwordEncrypt");

async function loginUser(username, email, password) {
  if (!((username || email) && password)) {
    throw new CustomError("Username/email and password are required", 404);
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new CustomError("User not found", 401);
  }

  if (user.password !== passwordEncrypt(password)) {
    throw new CustomError("Wrong password", 401);
  }

  if (!user.isActive) {
    throw new CustomError("This account is not active", 403);
  }

  return user;
}

module.exports = loginUser;
