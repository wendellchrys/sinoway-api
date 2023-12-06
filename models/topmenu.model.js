const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopmenuSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topmenu",
      default: null,
    },
    order: {
      required: true,
      type: Number,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    description_short: {
      type: String,
      trim: true,
      default: "",
    },
    seo: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    link: {
      type: String,
      default: "",
    },
  },
  {
    collection: "topmenu",
    timestamps: true,
  }
);
const Topmenu = mongoose.model("Topmenu", TopmenuSchema);

module.exports = Topmenu;
