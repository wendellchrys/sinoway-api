const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariantsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    variants: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "variants",
    timestamps: true,
  }
);

const Variants = mongoose.model("Variants", VariantsSchema);

module.exports = Variants;
