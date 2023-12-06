const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
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
    collection: "categories",
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
