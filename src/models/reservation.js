"use strict";

const { mongoose } = require("../configs/dbConnection");
const uniqueValidator = require("mongoose-unique-validator");

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    coDriver: {
      type: String,
      trim: true,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    endDate: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    rentalPeriod: {
      type: Number,
      default: function () {
        return Math.round(
          (this.endDate - this.startDate) / (1000 * 60 * 60 * 24)
        );
      },
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { collection: "reservations", timestamps: true }
);

ReservationSchema.plugin(uniqueValidator, { message: "This {PATH} is exist" });

module.exports = mongoose.model("Reservation", ReservationSchema);
