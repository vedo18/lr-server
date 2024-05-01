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

export async function registerUser(req, res) {
  logger.info("Registering user handler");
  const body = JSON.parse(req.body);
  const data = await authService.registerUser(body);
  logger.info(data);
  res.send({ data });
}

app.post("/auth/register", catchError(this.registerUser));

export const handler = serverless(app, {
  callbackWaitForEmptyEventLoop: false,
});
