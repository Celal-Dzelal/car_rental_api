"use strict";

const { mongoose } = require("../configs/dbConnection");
const uniqueValidator = require("mongoose-unique-validator");

const CarSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: [1955, "The minimum manufacturing year for classic cars is 1955"],
      max: [1981, "The maximum manufacturing year for classic cars is 1981"],
    },
    isAutomatic: {
      type: Boolean,
      default: false,
    },
    capacity: {
      type: Number,
      required: true,
      min: [2, "The vehicle must have a minimum capacity of 2 passengers"],
      max: [6, "The vehicle must have a maximum capacity of 6 passengers"],
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "cars", timestamps: true }
);

CarSchema.plugin(uniqueValidator, { message: "This {PATH} is exist" });

module.exports = mongoose.model("Car", CarSchema);
