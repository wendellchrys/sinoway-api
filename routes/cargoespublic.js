const router = require("express").Router();
let Cargoes = require("../models/cargoes.model");

// get all items
router.route("/").get((req, res) => {
  Cargoes.find(
    { isActive: true },
    { title: 1, order: 1, _id: 1, price: 1, before_price: 1 }
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
