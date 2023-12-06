const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CargoesSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    title: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    price: {
      required: true,
      type: Number,
    },
    before_price: {
      required: true,
      type: Number,
      default: 0,
    },
    link: {
      required: true,
      type: String,
      unique: true,
      trim: true,
    },
    order: {
      required: true,
      type: Number,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    collection: "cargoes",
    timestamps: true,
  }
);

const Cargoes = mongoose.model("Cargoes", CargoesSchema);

module.exports = Cargoes;
