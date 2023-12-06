const router = require("express").Router();
let Country = require("../models/country.model");

// get all items
router.route("/").get((req, res) => {
  Country.find().then((data) => res.json(data));
});

// get item
router.route("/:id").get((req, res) => {
  Country.find({ name: req.params.id }).then((data) => res.json(data));
});

module.exports = router;
