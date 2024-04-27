const db = require("../utils/db");
const cors = require("cors");
const express = require("express");
const app = express();
const serverless = require("serverless-http");
const catchError = require("../utils/error/catchError");

app.use(cors());
app.use(cookieParser());
app.use(useragent.express());

await db.openDBConnection();

module.exports.registerUser = async () => {
  logger.info("Registering user handler");
};

app.post("/auth/register", catchError(this.registerUser));

module.exports.handler = serverless(app, {
  callbackWaitForEmptyEventLoop: false,
});
