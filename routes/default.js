const router = require("express").Router();

router.route("/").get((req, res) => {
   res.json({"message": "Deploy Success v_1.0.0"});
});

module.exports = router;