const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: Boolean,
      required: true,
      default: false,
    },
    categories_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categories",
          default: null,
        }
    ],
    brands_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      default: null,
    },
    code: {
      type: String,
      trim: true,
    },
    productCode: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description_short: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    seo: {
      type: String,
      required: true,
    },
    order: {
      required: true,
      type: Number,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    before_price: {
      type: Number,
      required: true,
      default: 0,
    },
    variants: {
      type: Array,
    },
    variant_products: {
      type: Array,
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    length: {
      type: Number,
    },
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    saleqty: {
      type: Number,
      required: true,
      default: 0,
    },
    OEM:  {
      type: String,
      trim: true,
    },
    tag:  {
      type: String,
      trim: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

//line for search text
ProductsSchema.index({ title: "text", description: "text" });

const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
