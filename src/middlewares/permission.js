"use strict";

/* -------------------------------------------------------------------------- */

const CustomError = require("../errors/customError");

/* -------------------------------------------------------------------------- */

function getUserInfo(req) {
  let user = req.user;
  let isActive = req.user?.isActive;
  let isAdmin = req.user?.isAdmin;
  let isStaff = req.user?.isStaff;

  return { user, isActive, isAdmin, isStaff };
}

module.exports = {
  isLogin: (req, res, next) => {
    const { user, isActive } = getUserInfo(req);

    if (user && isActive) next();
    else
      throw new CustomError(
        "You must be logged in to access this resource",
        403
      );
  },
  isStafforisAdmin: (req, res, next) => {
    if (!(req.user?.isAdmin || req.user?.isStaff)) {
      throw new CustomError(
        "Your account is not active. Please contact support",
        403
      );
    }
    next();
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      throw new CustomError(
        "You must be an Admin to access this resources",
        403
      );
    }
  },
};
