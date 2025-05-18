"use strict";

const Token = require("../models/token");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    //! ------------------------------- SimpleToken ------------------------------ */
    if (tokenKey[0] == "Token") {
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      req.user = tokenData ? tokenData.userId : undefined;
    } else if (tokenKey[0] == "Bearer") {
      //! ----------------------------------- JWT ---------------------------------- */
      try {
        jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (error, data) => {
          req.user = data ? data : null;
        });
      } catch (error) {
        req.user = null;
      }
    }
  }
  next();
};
