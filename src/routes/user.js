"use strict";

const router = require("express").Router();
const validate = require("../middlewares/validate");
const { userUpdateSchema, userCreateSchema } = require("../models/zod");
const {
  list,
  create,
  read,
  update,
  deleteUser,
} = require("../controllers/user");

router.post("/", validate(userCreateSchema), create);
router.put("/:id", validate(userUpdateSchema), update);
router.patch("/:id", validate(userUpdateSchema), update);

router.get("/", list);
router.route("/:id").get(read).delete(deleteUser);

module.exports = router;
