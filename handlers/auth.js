import { openDBConnection } from "../utils/db";
import cors from "cors";
import express from "express";
const app = express();
import serverless from "serverless-http";
import catchError from "../utils/error/catchError";
import authService from "../services/auth";

app.use(cors());
app.use(cookieParser());
app.use(useragent.express());

await openDBConnection();

module.exports.registerUser = async (req, res) => {
  logger.info("Registering user handler");
  const body = JSON.parse(req.body);
  const data = await authService.registerUser(body);
  logger.info(data);
  res.send({ data });
};

module.exports.login = async (req, res) => {
  logger.info("Registering user handler");
  const body = JSON.parse(req.body);
  const data = await authService.registerUser(body);
  logger.info(data);
  res.send({ data });
};

app.post("/auth/register", catchError(this.registerUser));
app.post("/auth/login", catchError(this.login));

export const handler = serverless(app, {
  callbackWaitForEmptyEventLoop: false,
});
