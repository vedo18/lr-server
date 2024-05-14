const coreDB = require("../utils/db");
const cors = require("cors");
const express = require("express");
const userAgent = require("express-useragent");
const catchError = require("../utils/error/catchError");
const logger = require("../utils/logger");
const responser = require("../utils/responser");
const globalErrorHandler = require("../utils/error/globalError");
const serverless = require("serverless-http");
const app = express();

app.use(cors);
app.use(userAgent);

coreDB.openDBConnection();

module.exports.createCourse = async (req, res) => {
  logger.info("Creating course Handler");
  const reqData = JSON.parse(req.body);
  const createdCourse = await courseService.createCourse(reqData);
  return responser.send(201, "course", "C_S001", req, res, createdCourse);
};

app.use(globalErrorHandler);

app.route("/course/create", catchError(this.createCourse));

module.exports.handler = serverless(app, {
  callbackWaitForEmptyEventLoop: false,
});
