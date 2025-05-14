"use strict";

const { mongoose } = require("../configs/dbConnection");
const uniqueValidator = require("mongoose-unique-validator");
const dayjs = require("../helpers/dayjs");

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
      default: 0,
    },
  },
  { collection: "reservations", timestamps: true }
);

ReservationSchema.plugin(uniqueValidator, { message: "This {PATH} is exist" });

ReservationSchema.methods.toJSON = function () {
  const obj = this.toObject();

  obj.startDate = dayjs(obj.startDate).format("MMMM D, YYYY");
  obj.endDate = dayjs(obj.endDate).format("MMMM D, YYYY");

  return obj;
};

ReservationSchema.pre("save", async function (next) {
  try {
    const Car = require("./car");
    const car = await Car.findById(this.carId);
    if (!car) {
      throw new Error("Car not found");
    }
    this.amount = car.pricePerDay * this.rentalPeriod;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
