"use strict";

const validate = require("./validate");

module.exports = (err, req, res, next) => {
  return res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
    field: err.path.join("."),
    cause: err.cause,
    body: req.body,
  });
};
