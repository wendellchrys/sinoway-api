const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BasketSchema = new Schema(
  {
    created_user: {
      type: Object,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
      unique: true,
    },
    receiver_name: {
      type: String,
    },
    receiver_email: {
      type: String,
    },
    receiver_phone: {
      type: String,
    },
    cargoes_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cargoes",
      default: null,
    },
    total_price: {
      type: Number,
      default: 0,
    },
    total_discount: {
      type: Number,
      default: 0,
    },
    cargo_price: {
      type: Number,
      default: 0,
    },
    cargo_price_discount: {
      type: Number,
      default: 0,
    },
    shipping_address: {
      type: Object,
    },
    billing_address: {
      type: Object,
    },

    products: [
      {
        product_id: {
          type: String,
          required: true,
        },
        selectedVariants: {
          type: Object,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        seo: {
          type: String,
          required: true,
        },
      },
    ],
  },

  {
    collection: "basket",
    timestamps: true,
  }
);

const Basket = mongoose.model("Basket", BasketSchema);

module.exports = Basket;
