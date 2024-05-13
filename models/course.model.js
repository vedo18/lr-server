const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const user = require("./user.model");

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  seller: { type: Schema.Types.ObjectId, ref: "user" },
  buyers: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

module.exports = mongoose.model("course", courseSchema);
