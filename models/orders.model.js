const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    created_user: {
      type: Object,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    paymentmethods_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paymentmethods",
      default: null,
      required: true,
    },
    orderstatus_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orderstatus",
      default: null,
      required: true,
    },
    cargoes_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cargoes",
      default: null,
    },
    cargo_price: {
      type: Number,
      default: 0,
      required: true,
    },
    cargo_discount_price: {
      type: Number,
      default: 0,
      required: true,
    },
    receiver_name: {
      type: String,
      required: true,
    },
    receiver_email: {
      type: String,
      required: true,
    },
    receiver_phone: {
      type: String,
      required: true,
    },
    ordernumber: {
      type: String,
    },
    payment_intent: {
      type: String,
    },
    total_price: {
      type: Number,
      default: 0,
      required: true,
    },
    discount_price: {
      type: Number,
      default: 0,
      required: true,
    },
    cargo_no: {
      type: String,
    },
    note: {
      type: String,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    billing_address: {
      type: String,
      required: true,
    },
    products: [
      {
        type: {
          type: Boolean,
          required: true,
          default: true,
        },
        categories_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categories",
          default: null,
        },
        title: {
          type: String,
          required: true,
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
        selectedVariants: {
          type: Object,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
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
      },
    ],
  },
  {
    collection: "orders",

    timestamps: true,
  }
);

OrdersSchema.pre("save", function (next) {
  let number = moment().unix().toString() + moment().milliseconds().toString();
  if (number.length == 12) {
    number = number + "0";
  }
  if (number.length == 11) {
    number = number + "00";
  }
  this.ordernumber = number;
  next();
});

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;
