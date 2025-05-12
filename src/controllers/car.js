"use strict";

const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(
      Car
      // req.user.isAdmin ? {} : { _id: req.user.id }
    );
    const details = await res.getModelListDetails(Car);
    res.status(200).send({
      error: false,
      details,
      data,
    });
  },
  create: async (req, res) => {
    const data = await Car.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await Car.findById(req.params.id);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).send({
      error: false,
      data,
    });
  },
  deleteCar: async (req, res) => {
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await User.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Car Deleted Succesfully",
      });
    }
    return res.status(404).send({
      error: true,
      message: "Car not found or already deleted",
    });
  },
};
