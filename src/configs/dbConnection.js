"use strict";

const mongoose = require("mongoose");

const dbConnection = function () {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("DB CONNECTION: ** SUCCESS ** "))
    .catch((err) => console.log("DB CONNECTION: !! FAILED !!", err));
};

module.exports = {
  mongoose,
  dbConnection,
};
