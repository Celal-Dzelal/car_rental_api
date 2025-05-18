"use strict";

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    // #swagger.ignore = true

    const data = await res.getModelList(Token);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      data,
    });
  },
  create: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.findById(req.params.id);

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.findByIdAndUpdate(req.params.id, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Token.findById(req.params.id),
    });
  },
  deleteToken: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.findByIdAndDelete(req.params.id);

    if (data) {
      return res.status(200).send({
        error: false,
        message: "Token Deleted Succesfully",
      });
    }

    return res.status(404).send({
      error: true,
      message: "Token not found or already deleted",
    });
  },
};
