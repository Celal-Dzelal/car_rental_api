"use strict";

module.exports = (err, req, res, next) => {
  // console.error("🔥 ERROR:", err);

  return res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
    field: err.path?.join?.(".") || null,
    cause: err.cause || null,
    body: req.body,
  });
};
