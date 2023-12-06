const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema(
  {
    company: {
      required: true,
      type: String,
      trim: true,
    },
    taxnumber: {
      required: true,
      type: String,
      trim: true,
    },
    taxcenter: {
      required: true,
      type: String,
      trim: true,
    },
    price_icon: {
      required: true,
      type: String,
      trim: true,
    },
    price_type: {
      required: true,
      type: Boolean,
      trim: true,
    },
    address: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    title: {
      required: true,
      type: String,
      trim: true,
    },
    description: {
      required: true,
      type: String,
      trim: true,
    },
    keywords: {
      required: true,
      type: String,
      trim: true,
    },
    website: {
      required: true,
      type: String,
      trim: true,
    },
    company_user: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        mail: {
          type: String,
          required: true,
          default: true,
        },
        phone: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    email: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    phone: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],
    anydata: [
      {
        name: {
          type: String,
          required: true,
          default: true,
        },
        value: {
          type: String,
          required: true,
          default: true,
        },
      },
    ],

    image: {
      type: String,
    },
  },
  {
    collection: "settings",
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", SettingsSchema);

module.exports = Settings;
