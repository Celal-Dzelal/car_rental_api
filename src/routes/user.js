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
router.get("/:id", read);
router.delete("/:id", deleteUser);

module.exports = router;
