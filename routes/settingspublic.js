const router = require("express").Router();
let Settings = require("../models/settings.model");

// get all items
router.route("/").get((req, res) => {
  Settings.find()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) =>
      res.json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
});

module.exports = router;
