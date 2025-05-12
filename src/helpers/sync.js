"use strict";

module.exports = async function () {
  const { mongoose } = require("../configs/dbConnection");

  if (process.env.NODE_ENV !== "development") {
    throw new Error(
      "This script is allowed to run only development environment"
    );
  }

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "WARNING: This will delete the entire database. Are you sure? (yes/no):",
    async (answer) => {
      if (answer.trim().toLowerCase() === "yes") {
        try {
          await mongoose.connection.dropDatabase();
          console.log("Database and all data have been DELETED!");
          try {
            const users = require("../mockData/user.json");
            const User = require("../models/user");
            await User.insertMany(users);
            console.log("Add Users: SUCCESS");
          } catch (err) {
            console.log("Add Users: FAILED", err);
          }
        } catch (err) {
          console.log("An error occured while deleting the database:", err);
        } finally {
          rl.close();
        }
      } else {
        console.log("Operation Cancelled");
        rl.close();
      }
    }
  );
};
