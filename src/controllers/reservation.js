"use strict";

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(
      Reservation
      // req.user.isAdmin ? {} : { _id: req.user.id }
    );
    const details = await res.getModelListDetails(Reservation);
    res.status(200).send({
      error: false,
      details,
      data,
    });
  },
  create: async (req, res) => {
    const data = await Reservation.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await Reservation.findById(req.params.id);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).send({
      error: false,
      data,
    });
  },
  deleteReservation: async (req, res) => {
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await Reservation.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Reservation Deleted Succesfully",
      });
    }
    return res.status(404).send({
      error: true,
      message: "Reservation not found or already deleted",
    });
  },
};
