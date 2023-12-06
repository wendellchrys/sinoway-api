const router = require("express").Router();
let Turkey = require("../models/turkey.model");

// get all items
router.route("/").get((req, res) => {
  Turkey.find().then((data) => res.json(data));
});

// get item
router.route("/:id").get((req, res) => {
  Turkey.find({ name: req.params.id }).then((data) => res.json(data));
});

module.exports = router;
