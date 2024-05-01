const userModel = require("../models/user.model");

module.exports.createUser = async (data) => {
  const record = await userModel.create(data);
  return record;
};

module.exports.registerUser = async (body) => {
  const payload = {
    name: body.name,
    phoneNumber: body.phoneNumber,
    accountTyoe: "user",
    email: body.email,
  };

  const record = await this.createUser(payload);
  return record;
};
