const router = require("express").Router();



let Settings = require("../models/settings.model");
let settingsData = require("../db.json/nextly.settings.json");

let Users = require("../models/users.model");
let usersData = require("../db.json/nextly.users.json");

let Variants = require("../models/variants.model");
let variantsData = require("../db.json/nextly.variants.json");

let Turkey = require("../models/turkey.model");
let turkeyData = require("../db.json/nextly.turkey.json");

let Topmenu = require("../models/topmenu.model");
let topmenuData = require("../db.json/nextly.topmenu.json");

let Productimages = require("../models/productimages.model");
let productimagesData = require("../db.json/nextly.productimages.json");

let Products = require("../models/products.model");
let productsData = require("../db.json/nextly.products.json");

let Paymentmethods = require("../models/paymentmethods.model");
let paymentmethodsData = require("../db.json/nextly.paymentmethods.json");

let Orderstatus = require("../models/orderstatus.model");
let orderstatusData = require("../db.json/nextly.orderstatus.json");

let Orders = require("../models/orders.model");
let ordersData = require("../db.json/nextly.orders.json");

let Homeslider = require("../models/homeslider.model");
let homesliderData = require("../db.json/nextly.homeslider.json");

let Country = require("../models/country.model");
let countryData = require("../db.json/nextly.country.json");

let Categories = require("../models/categories.model");
let categoriesData = require("../db.json/nextly.categories.json");

let Cargoes = require("../models/cargoes.model");
let cargoesData = require("../db.json/nextly.cargoes.json");

let Brands = require("../models/brands.model");
let brandsData = require("../db.json/nextly.brands.json");

router.route("/").get((req, res) => {





  Settings.find().then((val) => {
    if (val.length > 0) {
      console.log("have Settings  ");
    } else {
      const strReplace = JSON.stringify(settingsData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')

      Settings.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Settings  data");
        }
      });
    }
  });

  Users.find().then((val) => {
    if (val.length > 0) {
      console.log("have Users  ");
    } else {

      const strReplace = JSON.stringify(usersData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')

      Users.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Users  data");
        }
      });
    }
  });

  Variants.find().then((val) => {
    if (val.length > 0) {
      console.log("have Variants  ");
    } else {

      const strReplace = JSON.stringify(variantsData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Variants.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Variants  data");
        }
      });
    }
  });

  Turkey.find().then((val) => {
    if (val.length > 0) {
      console.log("have Turkey  ");
    } else {

      const strReplace = JSON.stringify(turkeyData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Turkey.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Turkey  data");
        }
      });
    }
  });

  Topmenu.find().then((val) => {
    if (val.length > 0) {
      console.log("have Topmenu  ");
    } else {

      const strReplace = JSON.stringify(topmenuData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Topmenu.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Topmenu data");
        }
      });
    }
  });

  Products.find().then((val) => {
    if (val.length > 0) {
      console.log("have Products  ");
    } else {

      const strReplace = JSON.stringify(productsData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')



      Products.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Products  data");
        }
      });
    }
  });

  Productimages.find().then((val) => {
    if (val.length > 0) {
      console.log("have Productimages  ");
    } else {

      const strReplace = JSON.stringify(productimagesData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Productimages.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Productimages  data");
        }
      });
    }
  });

  Paymentmethods.find().then((val) => {
    if (val.length > 0) {
      console.log("have Paymentmethods  ");
    } else {

      const strReplace = JSON.stringify(paymentmethodsData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Paymentmethods.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Paymentmethods  data");
        }
      });
    }
  });

  Orderstatus.find().then((val) => {
    if (val.length > 0) {
      console.log("have Orderstatus  ");
    } else {

      const strReplace = JSON.stringify(orderstatusData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Orderstatus.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Orderstatus  data");
        }
      });
    }
  });

  Orders.find().then((val) => {
    if (val.length > 0) {
      console.log("have Orders  ");
    } else {

      const strReplace = JSON.stringify(ordersData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Orders.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Orders  data");
        }
      });
    }
  });

  Homeslider.find().then((val) => {
    if (val.length > 0) {
      console.log("have Homeslider  ");
    } else {

      const strReplace = JSON.stringify(homesliderData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Homeslider.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Homeslider  data");
        }
      });
    }
  });

  Country.find().then((val) => {
    if (val.length > 0) {
      console.log("have Country  ");
    } else {

      const strReplace = JSON.stringify(countryData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Country.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Country  data");
        }
      });
    }
  });

  Categories.find().then((val) => {
    if (val.length > 0) {
      console.log("have Categories  ");
    } else {

      const strReplace = JSON.stringify(categoriesData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')



      Categories.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Categories  data");
        }
      });
    }
  });

  Cargoes.find().then((val) => {
    if (val.length > 0) {
      console.log("have Cargoes  ");
    } else {

      const strReplace = JSON.stringify(cargoesData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Cargoes.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Cargoes  data");
        }
      });
    }
  });

  Brands.find().then((val) => {
    if (val.length > 0) {
      console.log("have Brands  ");
    } else {

      const strReplace = JSON.stringify(brandsData)
        .replaceAll(/\\"/g, "")
        .replaceAll("ObjectId(", "")
        .replaceAll(')"', '"')


      Brands.insertMany(JSON.parse(strReplace), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Brands  data");
        }
      });
    }
  });
  res.json({
    messagge: "instalitions okey ",
  });
});

module.exports = router;
