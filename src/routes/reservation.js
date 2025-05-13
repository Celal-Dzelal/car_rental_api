"use strict";

const router = require("express").Router();
const validate = require("../middlewares/validate");
const {
  reservationCreateSchema,
  reservationUpdateSchema,
} = require("../models/zod");

const {
  list,
  create,
  read,
  update,
  deleteReservation,
} = require("../controllers/reservation");

router.post("/", validate(reservationCreateSchema), create);
router.put("/:id", validate(reservationUpdateSchema), update);
router.patch("/:id", validate(reservationUpdateSchema), update);

router.get("/", list);

router.route("/:id").get(read).delete(deleteReservation);

module.exports = router;
