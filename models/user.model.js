const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema({
  name: { type: "string", required: true },
  profilePic: { type: "string" },
  phoneNumber: { type: "string", required: true, unique: true },
  phoneOTP: { type: Number },
  email: { type: "string", unique: true, required: true },
  password: { type: "string", required: true },

  accountType: {
    type: "string",
    default: "user",
    enum: ["user", "admin", "seller"],
  },

  createdBy: { type: String, required: true, default: "system" },
  updatedBy: { type: String, required: true, default: "system" },
  fcmToken: { type: String, default: null },
});

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("User", userSchema);
