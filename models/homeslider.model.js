const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomesliderSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homeslider",
      default: null,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      required: true,
      type: Number,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "homeslider",
    timestamps: true,
  }
);

const Homeslider = mongoose.model("Homeslider", HomesliderSchema);

module.exports = Homeslider;
