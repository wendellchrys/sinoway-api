const router = require("express").Router();
let Paymentmethods = require("../models/paymentmethods.model");

// get all items
router.route("/").get((req, res) => {
  Paymentmethods.find(
    { isActive: true },
    { order: 1, title: 1, public_key: 1, contract: 1 }
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

router.route("/:id").get((req, res) => {
  Paymentmethods.find(
    { _id: req.params.id },
    { order: 1, title: 1, public_key: 1, contract: 1 }
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
