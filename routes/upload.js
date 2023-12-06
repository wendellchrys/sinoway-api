const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const passport = require("passport");


const uploadImage = async (req, res, next) => {
  try {
    if (req.body[0]) {
      // to declare some path to store your converted image
      const path =
        "./public/images/uploads/staff/" + Date.now() + ".png";

      const imgdata = req.body[0].thumbUrl;
      if (!imgdata) {
        return res.send("./public");
      }

      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

      fs.writeFileSync(path, base64Data, { encoding: "base64" });

      return res.send(path);
    } else {
      return res.send("./public");
    }
  } catch (e) {
    next(e);
  }
};

router.post(
  "/uploadstaffavatar",
  passport.authenticate("jwt", { session: false }),
  uploadImage,
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["staff/add"]) {
      if (req.file) return res.json({ msg: "image successfully uploaded" });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletestaffavatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["staff/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

const uploadImageCustomer = async (req, res, next) => {
  try {
    if (req.body[0]) {
      // to declare some path to store your converted image
      const path =
        "./public/images/uploads/customers/" + Date.now() + ".png";

      const imgdata = req.body[0].thumbUrl;
      if (!imgdata) {
        return res.send("./public");
      }

      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

      fs.writeFileSync(path, base64Data, { encoding: "base64" });

      return res.send(path);
    } else {
      return res.send("./public");
    }
  } catch (e) {
    next(e);
  }
};

router.post(
  "/uploadcustomersavatar",
  passport.authenticate("jwt", { session: false }),
  uploadImageCustomer,
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["customers/add"]) {
      if (req.file) return res.json({ msg: "image successfully uploaded" });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletecustomersavatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["customers/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterProduct = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadproductimage = multer({
  storage: storageProduct,
  fileFilter: fileFilterProduct,
});

router.post(
  "/uploadproductimage",
  passport.authenticate("jwt", { session: false }),
  uploadproductimage.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["productimages/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deleteproductimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["productimages/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

//cargo image manage

const storageCargo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/cargoes");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterCargo = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagecargo = multer({
  storage: storageCargo,
  fileFilter: fileFilterCargo,
});

router.post(
  "/uploadcargoimage",
  passport.authenticate("jwt", { session: false }),
  uploadimagecargo.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["cargoes/add"]) {
      console.log(req.file);
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletecargoimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["cargoes/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

//orderstatus image manage

const storageOrderstatus = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/orderstatus");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterOrderstatus = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageorderstatus = multer({
  storage: storageOrderstatus,
  fileFilter: fileFilterOrderstatus,
});

router.post(
  "/uploadorderstatusimage",
  passport.authenticate("jwt", { session: false }),
  uploadimageorderstatus.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["orderstatus/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deleteorderstatusimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["orderstatus/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

//payment methods image manage

const storagePaymentmethods = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/paymentmethods");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterPaymentmethods = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagepaymentmethods = multer({
  storage: storagePaymentmethods,
  fileFilter: fileFilterPaymentmethods,
});

router.post(
  "/uploadpaymentmethodsimage",
  passport.authenticate("jwt", { session: false }),
  uploadimagepaymentmethods.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["paymentmethods/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletepaymentmethodsimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["paymentmethods/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

//brands image manage

const storageBrands = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/brands");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterBrands = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimageBrands = multer({
  storage: storageBrands,
  fileFilter: fileFilterBrands,
});

router.post(
  "/uploadbrandsimage",
  passport.authenticate("jwt", { session: false }),
  uploadimageBrands.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["brands/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletebrandsimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["brands/id"]) {
      try {
        fs.unlinkSync("../admin/public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

//homeslider image manage

const storagehomeslider = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/homeslider");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterhomeslider = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagehomeslider = multer({
  storage: storagehomeslider,
  fileFilter: fileFilterhomeslider,
});

router.post(
  "/uploadhomesliderimage",
  passport.authenticate("jwt", { session: false }),
  uploadimagehomeslider.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["homeslider/add"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletehomesliderimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["homeslider/id"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);



//Logo image manage

const storageLogo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilterLogo = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/GIF",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadimagelogo = multer({
  storage: storageLogo,
  fileFilter: fileFilterLogo,
});

router.post(
  "/uploadlogoimage",
  passport.authenticate("jwt", { session: false }),
  uploadimagelogo.single("image"),
  (req, res) => {
    const rolesControl = req.user.role;

    if (rolesControl["superadmin"]) {
      if (req.file)
        return res.json({
          msg: "image successfully uploaded",
          path: req.file.path,
        });
      res.send("Image upload failed");
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

router.post(
  "/deletelogoimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rolesControl = req.user.role;
    if (rolesControl["superadmin"]) {
      try {
        fs.unlinkSync("./public" + req.body.path);
      } catch (e) {
        console.log("not image");
      }
    } else {
      res.status(403).json({
        message: {
          messagge: "You are not authorized, go away!",
          variant: "error",
        },
      });
    }
  }
);

module.exports = router;
