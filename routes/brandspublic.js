const router = require("express").Router();
let Brands = require("../models/brands.model");

// get all items
router.route("/").get((req, res) => {
  Brands.find({ isActive: true }, { title: 1, image: 1, order: 1, _id: 1 })
    .sort({ order: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
});

module.exports = router;
