"use strict";

const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "List Cars"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
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
    /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{
                $ref:"#/definitions/Car"
                }
              
            }
        */
    const data = await Car.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Get Single Car"
        */
    // const userId = req.user.isAdmin ? req.params.id : req.user.id;
    const data = await Car.findById(req.params.id);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Car"
                }
            }
        */
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
    /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */
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
