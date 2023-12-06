const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema(
  {
    code2: {
      type: String,
      required: true,
      unique: true,
    },
    code3: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    capital: {
      type: String,
    },
    region: {
      type: String,
    },
    subregion: {
      type: String,
    },
    states: [
      {
        code: {
          type: String,
        },
        name: {
          type: String,
        },
        subdivision: {
          type: String,
        },
      },
    ],
  },
  {
    collection: "country",
    timestamps: true,
  }
);

const Country = mongoose.model("country", CountrySchema);

module.exports = Country;
