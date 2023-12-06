const router = require("express").Router();
let Homeslider = require("../models/homeslider.model");

// get all items
router.route("/").get((req, res) => {
  Homeslider.find(
    { isActive: true },
    { title: 1, description: 1, link: 1, image: 1, _id: 1, categories_id: 1 }
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
});

module.exports = router;
