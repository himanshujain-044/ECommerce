const helmet = require("helmet");
const express = require("express");

const app = express();
const users = require("./routes/users");
// const admin = require('./routes/admin');

const ErrorClass = require("./services/error");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/users", users);

app.all("*", (req) => {
  throw new ErrorClass(`Requested URL ${req.path} not found!`, 404);
});

app.use((err, req, res, next) => {
  const errorCode = err.code || 500;
  res.status(errorCode).send({
    message: err.message || "Internal Server Error. Something went wrong!",
    status: errorCode,
  });
});

module.exports = app;
