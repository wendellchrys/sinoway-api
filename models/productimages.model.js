const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductimagesSchema = new Schema(
  {
    created_user: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      default: null,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "productimages",
    timestamps: true,
  }
);

const Productimages = mongoose.model("Productimages", ProductimagesSchema);

module.exports = Productimages;
