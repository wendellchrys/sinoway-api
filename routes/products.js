const router = require("express").Router();
const passport = require("passport");
let Products = require("../models/products.model");

const title = "Products";
const roleTitle = "products";

// get all items
router
   .route("/")
   .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      const rolesControl = req.user.role;
      console.log('teste');
      if (rolesControl[roleTitle + "/list"]) {
          console.log('teste');
         Products.find()
            .then((data) => {
               res.json(data);
            })
            .catch((err) => {
               console.log("Error: " + err);
               alert("Error: " + err);
               res.json({
                  messagge: "Error: " + err,
                  variant: "error",
               });
            });
      } else if (rolesControl[roleTitle + "onlyyou"]) {
         Products.find({
            "created_user.id": `${req.user._id}`,
         })
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
         res.status(403).json({
            message: {
               messagge: "You are not authorized, go away!",
               variant: "error",
            },
         });
      }
   });

// post new items
router
   .route("/add")
   .post(passport.authenticate("jwt", { session: false }), (req, res) => {
      const rolesControl = req.user.role;
      if (rolesControl[roleTitle + "/add"]) {
         new Products(req.body)
            .save()

            .then(() =>
               res.json({
                  messagge: title + " Added",
                  variant: "success",
               })
            )
            .catch((err) =>
               res.json({
                  messagge: " Error: " + err,
                  variant: "error",
               })
            );
      } else {
          console.log('teste 403');
         res.status(403).json({
            message: {
               messagge: "You are not authorized, go away!",
               variant: "error",
            },
         });
      }
   });

router
   .route("/counts/")
   .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      Products.countDocuments()
         .then((data) => res.json(data))
         .catch((err) =>
            res.status(400).json({
               messagge: "Error: " + err,
               variant: "error",
            })
         );
   });

//group name statistic
router
   .route("/statistic")
   .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      const rolesControl = req.user.role;
      if (rolesControl[roleTitle + "/list"]) {
         Products.aggregate([
            { $unwind: "$category_id" },
            {
               $group: {
                  _id: "$category_id.label",
                  count: { $sum: 1 },
               },
            },
         ]).then((data) => res.json(data));
      }
   });

// fetch data by id
router
   .route("/:id")
   .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      const rolesControl = req.user.role;
      if (rolesControl[roleTitle + "/list"]) {
         Products.findById(req.params.id)
            .then((data) => res.json(data))
            .catch((err) =>
               res.status(400).json({
                  messagge: "Error: " + err,
                  variant: "error",
               })
            );
      } else if (rolesControl[roleTitle + "onlyyou"]) {
         Products.findOne({
            _id: req.params.id,
            "created_user.id": `${req.user._id}`,
         })
            .then((data) => {
               if (data) {
                  res.json(data);
               } else {
                  res.status(403).json({
                     message: {
                        messagge: "You are not authorized, go away!",
                        variant: "error",
                     },
                  });
               }
            })
            .catch((err) =>
               res.status(400).json({
                  messagge: "Error: " + err,
                  variant: "error",
               })
            );
      } else {
         res.status(403).json({
            message: {
               messagge: "You are not authorized, go away!",
               variant: "error",
            },
         });
      }
   });

// delete data by id
router
   .route("/:id")
   .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
      const rolesControl = req.user.role;
      if (rolesControl[roleTitle + "delete"]) {
         Products.findByIdAndDelete(req.params.id)
            .then(() =>
               res.json({
                  messagge: title + " Deleted",
                  variant: "info",
               })
            )
            .catch((err) =>
               res.json({
                  messagge: "Error: " + err,
                  variant: "error",
               })
            );
      } else if (rolesControl[roleTitle + "onlyyou"]) {
         Products.deleteOne({
            _id: req.params.id,
            "created_user.id": `${req.user._id}`,
         })
            .then((resdata) => {
               if (resdata.deletedCount > 0) {
                  res.json({
                     messagge: title + " delete",
                     variant: "success",
                  });
               } else {
                  res.status(403).json({
                     message: {
                        messagge: "You are not authorized, go away!",
                        variant: "error",
                     },
                  });
               }
            })
            .catch((err) =>
               res.json({
                  messagge: "Error: " + err,
                  variant: "error",
               })
            );
      } else {
         res.status(403).json({
            message: {
               messagge: "You are not authorized, go away!",
               variant: "error",
            },
         });
      }
   });

// update data by id
router
.route("/:id")
.post(passport.authenticate("jwt", { session: false }), (req, res) => {
  const rolesControl = req.user.role;
  if (rolesControl[roleTitle + "/id"]) {
    Products.findByIdAndUpdate(req.params.id, { categories_id: req.body.categories_id, before_price: req.body.before_price, brands_id: req.body.brands_id, code: req.body.code, description: req.body.description, description_short: req.body.description_short, isActive: req.body.isActive, OEM: req.body.OEM, order: req.body.order, price: req.body.price, productCode: req.body.productCode, qty: req.body.qty, saleqty: req.body.saleqty, seo: req.body.seo, tag: req.body.tag, title: req.body.title, type: req.body.type, variant_products: req.body.variant_products, variants: req.body.variants })
      .then(() =>
        res.json({
          message: title + " Update",
          variant: "success",
        })
      )
      .catch((err) =>
        res.json({
          message: "Error: " + err,
          variant: "error",
        })
      );
  } else if (rolesControl[roleTitle + "onlyyou"]) {
    Products.findOneAndUpdate(
      {
        _id: req.params.id,
        "created_user.id": req.user._id,
      },
      { categories_id: req.body.categories_id, before_price: req.body.before_price, brands_id: req.body.brands_id, code: req.body.code, description: req.body.description, description_short: req.body.description_short, isActive: req.body.isActive, OEM: req.body.OEM, order: req.body.order, price: req.body.price, productCode: req.body.productCode, qty: req.body.qty, saleqty: req.body.saleqty, seo: req.body.seo, tag: req.body.tag, title: req.body.title, type: req.body.type, variant_products: req.body.variant_products, variants: req.body.variants }
    )
      .then((resdata) => {
        if (resdata) {
          res.json({
            message: title + " Update",
            variant: "success",
          });
        } else {
          res.json({
            message: " You are not authorized, go away!",
            variant: "error",
          });
        }
      })
      .catch((err) =>
        res.json({
          message: "Error: " + err,
          variant: "error",
        })
      );
  } else {
    res.status(403).json({
      message: {
        message: "You are not authorized, go away!",
        variant: "error",
      },
    });
  }
});

module.exports = router;
