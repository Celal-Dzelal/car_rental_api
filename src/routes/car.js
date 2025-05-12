"use strict";

const router = require("express").Router();

const { list, create, read, update, deleteCar } = require("../controllers/car");
const upload = require("../middlewares/upload");

router.route("/").get(list).post(upload.array("image")).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deleteCar);

module.exports = router;
