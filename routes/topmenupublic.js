const router = require("express").Router();
let Topmenu = require("../models/topmenu.model");

// get all items
router.route("/:id").get((req, res) => {
  if (req.params.id == "not") {
    Topmenu.find(
      {},
      {
        title: 1,
        order: 1,
        seo: 1,
        link: 1,
        categories_id: 1,
        _id: 1,
        isActive: 1,
      }
    )
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
  } else {
    Topmenu.find({ seo: req.params.id }, {})
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
  }
});

module.exports = router;
