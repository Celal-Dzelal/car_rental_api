"use strict";

const router = require("express").Router();

//! -------------------------------------------------------------------------- */

router.use("/users", require("./user"));

router.use("/cars", require("./car"));

//! -------------------------------------------------------------------------- */

module.exports = router;
