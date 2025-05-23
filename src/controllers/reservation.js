"use strict";

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "List Reservations"
      #swagger.description = `
          Admin and staff can list all reservations.
          Normal users can only see their own reservations.
          <ul> Examples:
              <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
              <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
              <li>URL/?<b>page=2&limit=1</b></li>
          </ul>
      `
    */

    if (!req.user) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access." });
    }

    let query = {};

    if (!(req.user?.isAdmin || req.user?.isStaff)) {
      query.userId = req.user._id;
    }

    const data = await res.getModelList(Reservation, query);
    const details = await res.getModelListDetails(Reservation, query);

    res.status(200).send({
      error: false,
      details,
      data,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{
                $ref:"#/definitions/Reservation"
                }
              
            }
        */
    const data = await Reservation.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await Reservation.findById(req.params.id);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Reservation"
                }
            }
        */
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
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */
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
