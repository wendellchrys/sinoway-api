const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = new mongoose.Schema(
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
    isCustomer: {
      type: Boolean,
      required: true,
      default: true,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },

    username: {
      type: String,
      required: true,
      min: 6,
      max: 15,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    price_calculation_base: {
	type: String
    },
    role: {
      type: Object,
      default: {
        // "staffonlyyou": true,
        // "staff/add": false,
        // "staff/id": false,  //edit
        // "staff/list": false,
        // "staffdelete": false,
        // "staffview": true,
        // "customersonlyyou": true,
        // "customers/add": false,
        // "customers/id": false,
        // "customers/list": false,
        // "customersdelete": false,
        // "customersview": true,
        // "productsonlyyou": true,
        // "products/add": false,
        // "products/id": false,
        // "products/list": false,
        // "productsdelete": false,
        // "productsview": true,
        // "categoriesonlyyou": true,
        // "categories/add": false,
        // "categories/id": false,
        // "categories/list": false,
        // "categoriesdelete": false,
        // "scategoriesview": true,
        // "variantsonlyyou": true,
        // "variants/add": false,
        // "variants/id": false,
        // "variants/list": false,
        // "variantsdelete": false,
        // "variantsview": true,
        // "ordersonlyyou": true,
        // "orders/add": false,
        // "orders/id": false,
        // "orders/list": false,
        // "ordersdelete": false,
        // "ordersview": true,
      },
    },

    image: {
      type: String,
    },
    company: {
      type: String,
      trim: true,
    },

    taxoffice: {
      type: String,
      trim: true,
    },

    taxnumber: {
      type: String,
    },

    ssn: {
      type: String,
    },
    executive: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    prefix: {
      type: String,
    },
    fax: {
      type: String,
    },
    web: {
      type: String,
    },
    risk: {
      type: Number,
    },

    address: [
      {
        type: {
          type: Boolean,
          default: true,
        },
        name: {
          type: String,
        },
        country_id: {
          type: String,
          default: "Turkey",
        },
        state_id: {
          type: String,
        },
        city_id: {
          type: String,
        },
        town_id: {
          type: String,
        },
        district_id: {
          type: String,
        },
        village_id: {
          type: String,
        },
        address: {
          type: String,
        },
      },
    ],

    spesific_id: {
      type: String,
    },

    resetPasswordToken: {
      type: String,
      default: "asdasdasdas--example--6yhjkoıu7654esxcvbhythbvfde45ty",
    },
    resetPasswordExpires: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

UsersSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UsersSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
