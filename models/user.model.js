const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema({
  name: { type: "string", required: true },
});

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("User", userSchema);
