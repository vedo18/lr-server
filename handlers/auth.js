const coreDB = require("../utils/db");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");
const serverless = require("serverless-http");
const catchError = require("../utils/error/catchError");
const authService = require("../services/auth");
const logger = require("../utils/log");
const responser = require("../utils/responser");
const globalErrorHandler = require("../utils/error/globalError");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(useragent.express());

coreDB.openDBConnection();

module.exports.registerUser = async (req, res) => {
  logger.info("Registering user handler");
  const body = JSON.parse(req.body);
  console.log("bodyyy", body);
  const data = await authService.registerUser(body);
  logger.info(data);
  return responser.send(200, "auth", "A_S001", req, res, data);
};

module.exports.login = async (req, res) => {
  logger.info("Registering user handler");
  const body = JSON.parse(req.body);
  const data = await authService.registerUser(body);
  logger.info(data);
  return responser.send(200, "auth", "A_S001", req, res, data);
};

app.post("/auth/register", catchError(this.registerUser));
app.post("/auth/login", catchError(this.login));

app.use(globalErrorHandler);

module.exports.handler = serverless(app, {
  callbackWaitForEmptyEventLoop: false,
});
