"use strict";

const { ZodError } = require("zod");

function validate(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse({ body: req.body });
      req.body = parsed.body;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        console.error("Validation Error Details:", formattedErrors);
        const validationError = new Error("Validation Failed");
        validationError.statusCode = 400;
        validationError.cause = formattedErrors;
        return next(validationError);
      }
      next(error);
    }
  };
}

module.exports = validate;
