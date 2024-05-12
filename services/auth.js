const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const AppError = require("../utils/error/appError");
const tokenService = require("../middleware/token");

module.exports.createUser = async (data) => {
  const record = await userModel.create(data);
  return record;
};

//login
module.exports.findUser = async (condition, populateData) => {
  const record = await userModel.findOne(condition);
  return record;
};

module.exports.registerUser = async (body) => {
  console.log("123body", body);
  if (!body.email || !body.password || !body.phoneNumber || !body.name) {
    console.log("111111111111111111");
    throw new AppError(400, "auth", "A_E003");
  }

  const emailExistCondition = {
    email: body.email,
  };

  const phoneNumberExistCondition = {
    phoneNumber: body.phoneNumber,
  };

  const emailExist = await this.findUser(emailExistCondition);

  if (emailExist) {
    throw new AppError(400, "auth", "A_E004");
  }

  const phoneNumberExist = await this.findUser(phoneNumberExistCondition);

  if (phoneNumberExist) {
    throw new AppError(400, "auth", "A_E005");
  }

  const password = bcrypt.hashSync(body.password);

  const payload = {
    name: body.name,
    phoneNumber: body.phoneNumber,
    password,
    email: body.email,
    accountType: "user",
  };

  const record = await this.createUser(payload);
  record.password = undefined;
  return record;
};

module.exports.loginUser = async (body) => {
  if (!body.email || !body.password) {
    throw new AppError(400, "auth", "A_E001");
  }

  const condition = {
    email: body.email,
    accountType: "user",
  };

  const user = await this.findUser(condition);
  console.log("user: " + user);
  if (!user) {
    throw new AppError(400, "auth", "A_E002");
  }

  if (!(await bcrypt.compare(body.password, user.password))) {
    throw new AppError(401, "auth", "A_E006");
  }

  const accessToken = await tokenService.signToken(user._id, "access");
  const refreshToken = await tokenService.signToken(user._id, "refresh");

  const userObject = {
    accessToken,
    refreshToken,
    id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };

  return userObject;
};
