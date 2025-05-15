"use strict";

const router = require("express").Router();

//! -------------------------------------------------------------------------- */

router.use("/users", require("./user"));

router.use("/cars", require("./car"));

router.use("/reservations", require("./reservation"));

router.use("/tokens", require("./token"));

router.use("/auth", require("./auth"));

router.use("/documents", require("./document"));

//! -------------------------------------------------------------------------- */

module.exports = router;
