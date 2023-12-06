const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentmethodsSchema = new Schema(
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
    contract: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    order: {
      required: true,
      type: Number,
    },
    public_key: {
      type: String,
    },
    secret_key: {
      type: String,
    },
    api: {
      type: Array,
    },
  },
  {
    collection: "paymentmethods",
    timestamps: true,
  }
);

const Paymentmethods = mongoose.model("Paymentmethods", PaymentmethodsSchema);

module.exports = Paymentmethods;
