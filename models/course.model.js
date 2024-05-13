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
  category: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ["Easy", "Intermediate", "Difficult"],
  },
  seller: { type: Schema.Types.ObjectId, ref: "user" },
  buyers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  averageRating: { type: Number },
  totalRating: { type: Number },
  rating: { type: Number },
});

courseSchema.paginate();
courseSchema.aggregatePaginate();

module.exports = mongoose.model("course", courseSchema);
