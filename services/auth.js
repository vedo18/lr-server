const userModel = require("../models/user.model");
const AppError = require("../utils/error/appError");

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
  const payload = {
    name: body.name,
    phoneNumber: body.phoneNumber,
    accountType: "user",
    email: body.email,
  };

  const record = await this.createUser(payload);
  return record;
};

module.exports.login = async (body) => {
  if (!body.email || !body.password) {
    throw new AppError(400, "auth", "A_E001");
  }

  const condition = {
    email: body.email,
    password: body.password,
    accountType: "user",
  };

  const record = await this.findUser(condition);
  if (!record) {
    throw new AppError(400, "auth", "A_E002");
  }
  return record;
};
