"use strict";

const { generateTokens, tokenRefresh } = require("../helpers/tokenGenerator");
const Token = require("../models/token");

module.exports = {
  login: async (req, res, next) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = "Login with username (or email) and password for get simpleToken and JWT"
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "test",
                "email":"test@example.com",
                "password": "Test1234&",
            }
        }
    */
    try {
      const { username, email, password } = req.body;
      const tokens = await generateTokens({ username, email, password });

      res.status(200).send({
        error: false,
        ...tokens,
      });
    } catch (error) {
      return next(error);
    }
  },
  refresh: async (req, res, next) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "JWT: Refresh"
        #swagger.description = "Refresh accessToken with refreshToken"
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                bearer: {
                    refresh: "...refreshToken..."
                }
            }
        }
    */
    try {
      const refreshToken = req.body?.bearer?.refresh;
      const tokens = await tokenRefresh(refreshToken);

      res.status(200).send({
        error: false,
        ...tokens,
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "SimpleToken: Logout"
        #swagger.description = "Delete token key"
    */
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    const tokenData = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Logout Success",
      data: tokenData,
    });
  },
};
