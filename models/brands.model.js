const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandsSchema = new Schema(
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
    order: {
      required: true,
      type: Number,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    seo: {
      type: String,
      required: true,
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
    collection: "brands",
    timestamps: true,
  }
);

const Brands = mongoose.model("Brands", BrandsSchema);

module.exports = Brands;
