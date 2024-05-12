const jwt = require("jsonwebtoken");
const logger = require("../utils/log");

module.exports.signToken = async (id, type) => {
  let secret;
  let tokenValidity;

  switch (type) {
    case "access":
      secret = process.env.JWT_SECRET;
      tokenValidity = process.env.ACCESS_TOKEN_VALIDITY;
      break;
    case "refresh":
      secret = process.env.REFRESH_SECRET;
      tokenValidity = process.env.REFRESH_TOKEN_VALIDITY;
      break;
    default:
      throw new Error("Invalid Access Token Type");
  }

  return jwt.sign({ id }, secret, {
    expiresIn: tokenValidity,
    issuer: "LearnRhythm",
  });
};
