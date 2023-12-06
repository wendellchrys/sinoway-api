const router = require("express").Router();
let Categories = require("../models/categories.model");

// get all items
router.route("/:id").get((req, res) => {
  if (req.params.id == "not") {
    Categories.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  } else {
    Categories.find({ isActive: req.params.id })
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.json({
          messagge: "Error: " + err,
          variant: "error",
        })
      );
  }
});

module.exports = router;
