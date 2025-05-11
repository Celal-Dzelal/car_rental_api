"use strict";

//! -------------------------------------------------------------------------- */
//! ----------------------- CAR RENTAL API by D.Z.E.L. ----------------------- */
//! -------------------------------------------------------------------------- */

//* npm init -y
//* npm i express dotenv mongoose mongoose-unique-validator morgan swagger-autogen swagger-ui-express redoc-express zod jsonwebtoken nodemailer multer
//* npm i nodemon -D
//* mkdir logs
//* node swaggerAutogen.js

const express = require("express");
const app = express();

//! ---------------------------- Required Modules ---------------------------- */

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

app.set("query parser", "extended");

//! --------------------------- DataBase Connection -------------------------- */

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

//! ------------------------------- Middlewares ------------------------------ */

app.use(express.json());

// app.use(require("./src/middlewares/authentication"));

// app.use(require("./src/middlewares/logger"));

// app.use(require("./src/middlewares/queryHandler"));

//! --------------------------------- Routes --------------------------------- */

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Car Rental API by D.Z.E.L.",
    // documents: {
    //   swagger: "/document/swagger",
    //   redoc: "/document/redoc",
    //   json: "/document/json",
    // },
  });
});

// app.use(require("./src/routes"));

//! ------------------------------ ErrorHandler ------------------------------ */

// app.use(require("./src/middlewares/errorHandler"));

//! ------------------------------- Run Server ------------------------------- */

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

//! ----------------------------- Syncronization ----------------------------- */

// require("./src/helpers/sync")(); //* Run once. Must be in commentline.
