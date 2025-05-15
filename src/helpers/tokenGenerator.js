"use strict";

const loginUser = require("./authService");
const passwordEncrypt = require("./passwordEncrypt");
const CustomError = require("../errors/customError");
const Token = require("../models/token");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function generateTokens({ username, email, password }) {
  const user = await loginUser(username, email, password);

  let tokenData = await Token.findOne({ userId: user._id });

  if (!tokenData) {
    const tokenKey = passwordEncrypt(user._id + Date.now());
    tokenData = await Token.create({ userId: user._id, token: tokenKey });
  }

  const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(
    { _id: user._id, password: user.password },
    process.env.REFRESH_KEY,
    { expiresIn: "3d" }
  );

  return {
    token: tokenData.token,
    bearer: {
      access: accessToken,
      refresh: refreshToken,
    },
    user,
  };
}

const tokenRefresh = async (refreshToken) => {
  if (!refreshToken) throw new CustomError("Refresh token not found", 401);

  const refreshData = jwt.verify(refreshToken, process.env.REFRESH_KEY);
  if (!refreshData) throw new CustomError("JWT Refresh Token is wrong", 401);

  const user = await User.findById(refreshData._id);
  if (!user) throw new CustomError("JWT Refresh Token data is broken");
  if (!user.isActive) throw new CustomError("This account is not active");

  const accessPayload = {
    _id: user._id,
    username: user.username,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
  };

  const accessToken = jwt.sign(accessPayload, process.env.ACCESS_KEY, {
    expiresIn: "30m",
  });

  return {
    access: accessToken,
  };
};

module.exports = { generateTokens, tokenRefresh };
