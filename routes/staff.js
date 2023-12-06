const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
const passport = require("passport");

const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;

const title = "Staff";

// get all items
router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["superadmin"]) {
      Users.find({ role: { $exists: true } })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({ messagge: "Error: " + err, variant: "error" })
        );
    } else if (rolesControl["staff/list"]) {
      Users.find({
        $and: [
          { role: { $exists: true } },
          { "role.superadmin": { $exists: false } },
        ],
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({ messagge: "Error: " + err, variant: "error" })
        );
    } else if (rolesControl["staffonlyyou"]) {
      Users.find({
        $or: [{ _id: req.user._id }, { "created_user.id": `${req.user._id}` }],
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({ messagge: "Error: " + err, variant: "error" })
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

    rolesControl["superadmin"] = false;

    if (rolesControl["staff/add"]) {
      new Users(req.body)
        .save()
        .then((data) =>
          res.json({
            messagge: title + " Added",
            variant: "success",
            data: data,
          })
        )
        .catch((err) =>
          res.json({ messagge: " Error: " + err, variant: "error" })
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

// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["staff/list"]) {
      Users.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({ messagge: "Error: " + err, variant: "error" })
        );
    } else if (rolesControl["staffonlyyou"]) {
      Users.findOne({ "created_user.id": `${req.user._id}` })
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
          res.status(400).json({ messagge: "Error: " + err, variant: "error" })
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

    if (req.params.id == req.user._id) {
      return res.json({
        messagge: " Can not delete yourself.",
        variant: "error",
      });
    }

    if (rolesControl["staffdelete"]) {
      Users.findByIdAndDelete(req.params.id)
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
    } else if (rolesControl["staffonlyyou"]) {
      Users.deleteOne({
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
              messagge: "You are not authorized, go away!",
              variant: "error",
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
        messagge: "You are not authorized, go away!",
        variant: "error",
      });
    }
  });

router.post(
  "/updatePasswordSuperadmin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["superadmin"] || req.body._id == req.user._id) {
      Users.findOne({
        _id: req.body._id,
      }).then((users) => {
        if (users != null) {
          console.log("user exists in db");
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
              Users.findOneAndUpdate(
                {
                  _id: req.body._id,
                },
                {
                  password: hashedPassword,
                }
              )
                .then(() => {
                  res.json({
                    messagge: title + " Password Update",
                    variant: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    messagge: "Error: " + err,
                    variant: "error",
                  });
                });
            });
        } else {
          console.error("no user exists in db to update");
          res.status(401).json("no user exists in db to update");
        }
      });
    } else {
      res.json({
        messagge: " You are not authorized, go away!",
        variant: "error",
      });
    }
  }
);

/// Update password customer
router.post(
  "/updatePasswordCustomer",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["customers/id"] || req.body._id == req.user._id) {
      Users.findOne({
        $and: [{ _id: req.body._id }, { isCustomer: true }],
      }).then((users) => {
        if (users != null) {
          console.log("user exists in db");
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
              Users.findOneAndUpdate(
                {
                  _id: req.body._id,
                },
                {
                  password: hashedPassword,
                }
              )
                .then(() => {
                  res.json({
                    messagge: title + " Password Update",
                    variant: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    messagge: "Error: " + err,
                    variant: "error",
                  });
                });
            });
        } else {
          console.error("no user exists in db to update");
          res.status(401).json("no user exists in db to update");
        }
      });
    } else {
      res.json({
        messagge: " You are not authorized, go away!",
        variant: "error",
      });
    }
  }
);

// update data by id
router
  .route("/:id")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["staff/id"]) {
      Users.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + " Update",
            variant: "success",
          })
        )
        .catch((err) =>
          res.json({
            messagge: "Error: " + err,
            variant: "error",
          })
        );
    } else if (rolesControl["staffonlyyou"]) {
      Users.findOneAndUpdate(
        {
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        },
        req.body
      )
        .then((resdata) => {
          if (resdata) {
            res.json({
              messagge: title + " Update",
              variant: "success",
            });
          } else {
            res.json({
              messagge: " You are not authorized, go away!",
              variant: "error",
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

// post new items
router.route("/add/register1231223123123").post((req, res) => {
  new Users(req.body)
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
});

module.exports = router;
