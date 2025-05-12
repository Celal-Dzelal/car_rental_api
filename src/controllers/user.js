"use strict";

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(
      User
      // req.user.isAdmin ? {} : { _id: req.user.id }
    );
    const details = await res.getModelListDetails(User);
    res.status(200).send({
      error: false,
      details,
      data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findById(userId);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(202).send({
      error: false,
      data,
    });
  },
  deleteUser: async (req, res) => {
    const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findByIdAndDelete(userId);
    if (data) {
      return res.status(200).send({
        message: "User Deleted Succesfully",
      });
    }
    return res.status(404).send({
      error: true,
      message: "User not found or already deleted",
    });
  },
};
