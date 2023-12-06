const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TurkeySchema = new Schema(
  {
    Il: { type: String, required: true, unique: true },
    Ilce: { type: Array, required: true, unique: true },
  },
  {
    collection: "turkey",
  }
);

const Turkey = mongoose.model("Turkey", TurkeySchema);

module.exports = Turkey;
