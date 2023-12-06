/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Users = require("../models/users.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { maillerConfig } = require("../config");
const WEBSITE_URL = process.env.WEBSITE_URL;

require("dotenv").config();

const BCRYPT_SALT_ROUNDS = 10;

const nodemailer = require("nodemailer");

const signToken = (userID) => {
   return JWT.sign(
      {
         iss: process.env.PASPORTJS_KEY,
         sub: userID,
      },
      process.env.PASPORTJS_KEY,
      { expiresIn: "30 days" }
   );
};

router.post(
   "/loginuser",
   passport.authenticate("local", { session: false }),
   (req, res) => {
      if (req.isAuthenticated()) {
         const {
            username,
            _id,
            name,
            surname,
            company,
            isCustomer,
            address,
            image,
            isActive,
            prefix,
            phone,
         } = req.user;
         const token = signToken(_id);
         res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: true,
         });
         res.status(200).json({
            isAuthenticated: true,
            token,
	    user: {
               username,
               id: _id,
               name: name,
               surname,
               company,
               isCustomer,
               image,
               address,
               isActive,
               prefix,
               phone,
            },
         });
      }
   }
);

router.post(
   "/login",
   passport.authenticate("local", { session: false }),
   (req, res) => {
      if (req.isAuthenticated()) {
         const {
            _id,
            username,
            role,
            name,
            surname,
            company,
            isCustomer,
            image,
            phone,
         } = req.user;
         const token = signToken(_id);
         res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: true,
         });
         res.status(200).json({
            isAuthenticated: true,
	    token,
            user: {
               username,
               role,
               id: _id,
               name: name + " " + surname,
               company: company,
               isCustomer: isCustomer,
               image: image,
               phone: phone,
            },
         });
      }
   }
);

router.put("/updatePasswordViaEmail", (req, res) => {
   Users.findOne({
      username: req.body.username,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: { $gte: Date.now() },
   }).then((user) => {
      if (user == null) {
      //console.error({message:"password reset link is invalid or has expired"});
         res
            .status(200)
            .send({ message: "password reset link is invalid or has expired" });
      } else if (user != null) {
         bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
               Users.findOneAndUpdate(
                  {
                     username: req.body.username,
                  },
                  {
                     password: hashedPassword,
                     resetPasswordToken: null,
                     resetPasswordExpires: null,
                  }
               )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
            })
            .then(() => {
               console.log("password updated");
               res.status(200).send({ message: "password updated" });
            });
      } else {
      // console.error({message:"no user exists in db to update"});
         res.status(200).send({ message: "no user exists in db to update" });
      }
   });
});

router.post("/register", (req, res) => {
   const { username, password, name, surname, prefix, phone } = req.body;

   Users.findOne({ username }).then((user) => {
      if (user)
         res.status(201).json({
            messagge: "E-mail is already taken",
            error: true,
         });
      else {
         new Users({
            username,
            password,
            name,
            surname,
            prefix,
            phone,
            isCustomer: true,
            created_user: { name: "register" },
         }).save((err) => {
            if (err)
               res.status(500).json({
                  messagge: "Error has occured " + err,
                  error: true,
               });
            else
               res.status(201).json({
                  messagge: "Account successfully created",
                  error: false,
               });
         });
      }
   });
});

router.get("/reset", (req, res) => {
   Users.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: { $gte: Date.now() },
   }).then((user) => {
      if (user == null) {
         console.error("password reset link is invalid or has expired");
         res.status(403).send("password reset link is invalid or has expired");
      } else {
         res.status(200).send({
            username: user.username,
            message: "password reset link a-ok",
         });
      }
   });
});

router.post("/forgotPassword", (req, res) => {
   if (req.body.username === "") {
      res.status(400).send("email required");
   }

   Users.findOne({ username: req.body.username }).then((user) => {
      if (user === null) {
         res.send("email not in db");
      } else {
         const token = crypto.randomBytes(20).toString("hex");
         Users.updateOne(
            {
               username: req.body.username,
            },
            {
               resetPasswordToken: token,
               resetPasswordExpires: Date.now() + 3600000,
            }
         )
            .then((res) => console.log(res + " added"))
            .catch((err) => console.log(err));

         const transporter = nodemailer.createTransport(maillerConfig);

         const mailOptions = {
            to: `${req.body.username}`,
            from: `${maillerConfig.auth.user}`,
            subject: "Link To Reset Password",
            text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `${process.env.ADMIN_SITE}/resetpassword/?token=${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
         };

         console.log("sending mail password" + req.body.username);

         transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
               console.error("there was an error: ", err);
            } else {
               console.log("here is the res: ", response);
               res.status(200).json("recovery email sent");
            }
         });
      }
   });
});

router.post("/forgotpasswordcustomer", (req, res) => {
   if (req.body.username === "") {
      res.status(400).send("email required");
   }

   Users.findOne({ username: req.body.username }).then((user) => {
      if (user === null) {
         res.send("email not in db");
      } else {
         const token = crypto.randomBytes(20).toString("hex");
         Users.updateOne(
            {
               username: req.body.username,
            },
            {
               resetPasswordToken: token,
               resetPasswordExpires: Date.now() + 3600000,
            }
         )
            .then((res) => console.log(res + " added"))
            .catch((err) => console.log(err));

         const transporter = nodemailer.createTransport(maillerConfig);

         const mailOptions = {
            to: `${req.body.username}`,
            from: `${maillerConfig.auth.user}`,
            subject: "Link To Reset Password",
            text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `${WEBSITE_URL}/resetpassword/?token=${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
         };

         console.log("sending mail password" + req.body.username);

         transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
               console.error("there was an error: ", err);
            } else {
               console.log("here is the res: ", response);
               res.status(200).json("recovery email sent");
            }
         });
      }
   });
});

router.get(
   "/logout",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      res.clearCookie("access_token");
      res.json({
         user: {
            username: "",
            role: "",
            id: "",
            name: "",
            company: "",
            isCustomer: "",
            phone: "",
         },
         success: true,
      });
   }
);

router.get(
   "/admin",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      if (req.Users.role === "admin") {
         res.status(200).json({
            message: { msgBody: "You are an admin", msgError: false },
         });
      } else {
         res.status(403).json({
            message: {
               msgBody: "You're not an admin,go away",
               msgError: true,
            },
         });
      }
   }
);

router.get(
   "/authenticateduser",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      const {
         username,
         _id,
         name,
         surname,
         company,
         isCustomer,
         address,
         image,
         isActive,
         prefix,
         phone,
      } = req.user;

      res.status(200).json({
         isAuthenticated: true,
         user: {
            username,
            id: _id,
            name: name + " " + surname,
            company,
            isCustomer,
            image,
            address,
            isActive,
            prefix,
            phone,
         },
      });
   }
);

router.get(
   "/authenticated",
  passport.authenticate("jwt", { session: false }),   
   (req, res) => {
      const {
         username,
         role,
         _id,
         name,
         surname,
         company,
         isCustomer,
         image,
         prefix,
         phone,
      } = req.user;
      res.status(200).json({
         isAuthenticated: true,
         user: {
            username,
            role,
            id: _id,
            name: name,
            surname,
            company: company,
            isCustomer: isCustomer,
            image: image,
            prefix: prefix,
            phone: phone,
         },
      });
   }
);

module.exports = router;
