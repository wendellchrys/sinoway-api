const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const path = require("path");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const urls = "https://sinoway.vercel.app,https://sinoway-admin.vercel.app,https://sinoway.net.br"
const allowedOrigins = urls.split(",");

app.disable("x-powered-by");
// app.use(express.static(path.join(__dirname, "../admin/public")));

app.use(helmet());

app.use(mongoSanitize());
app.use(compression());
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "1gb", parameterLimit: 50000 }));
app.use(
  express.urlencoded({ limit: "1gb", extended: true, parameterLimit: 50000 })
);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection MongoDB");
});

//instalition db import
const installDB = require("./routes/installdb.js");
app.use("/installdb", installDB);
//instalition

//Private Root import
const turkeyRouter = require("./routes/turkey");
const userRouter = require("./routes/users");
const uploadRouter = require("./routes/upload");
const staffRouter = require("./routes/staff");
const customerRouter = require("./routes/customers");
const countryRouter = require("./routes/country");
const productsRouter = require("./routes/products");
const productimagesRouter = require("./routes/productimages");
const variantsRouter = require("./routes/variants");
const categoriesRouter = require("./routes/categories");
const cargoesRouter = require("./routes/cargoes");
const homeSliderRouter = require("./routes/homeslider");
const ordersRouter = require("./routes/orders");
const orderstatusRouter = require("./routes/orderstatus");
const brandsRouter = require("./routes/brands");
const paymentmethodsRouter = require("./routes/paymentmethods");
const topmenuRouter = require("./routes/topmenu");
const settingsRouter = require("./routes/settings");
const basketRouter = require("./routes/basket");

//Public Root import
const settingsPublicRouter = require("./routes/settingspublic");
const topmenuPublicRouter = require("./routes/topmenupublic");
const categoriesPublicRouter = require("./routes/categoriespublic");
const brandsPublicRouter = require("./routes/brandspublic");
const homeSliderPublicRouter = require("./routes/homesliderpublic");
const productsPublicRouter = require("./routes/productspublic");
const cargoesPublicRouter = require("./routes/cargoespublic");
const customerPublicRouter = require("./routes/customerspublic");
const paymentPublicRouter = require("./routes/payment");
const paymentMethodsPublicRouter = require("./routes/paymentmethodspublic");
const defaultRouter = require("./routes/default");


//Private Root
app.use("/cargoes", cargoesRouter);
app.use("/homeslider", homeSliderRouter);
app.use("/orders", ordersRouter);
app.use("/orderstatus", orderstatusRouter);
app.use("/paymentmethods", paymentmethodsRouter);
app.use("/topmenu", topmenuRouter);
app.use("/users", userRouter);
app.use("/staff", staffRouter);
app.use("/customers", customerRouter);
app.use("/country", countryRouter);
app.use("/products", productsRouter);
app.use("/productimages", productimagesRouter);
app.use("/variants", variantsRouter);
app.use("/categories", categoriesRouter);
app.use("/brands", brandsRouter);
app.use("/turkey", turkeyRouter);
app.use("/upload", uploadRouter);
app.use("/settings", settingsRouter);
app.use("/basket", basketRouter);

//public Root
app.use("/settingspublic", settingsPublicRouter);
app.use("/topmenupublic", topmenuPublicRouter);
app.use("/categoriespublic", categoriesPublicRouter);
app.use("/brandspublic", brandsPublicRouter);
app.use("/homesliderpublic", homeSliderPublicRouter);
app.use("/productspublic", productsPublicRouter);
app.use("/cargoespublic", cargoesPublicRouter);
app.use("/customerspublic", customerPublicRouter);
app.use("/payment", paymentPublicRouter);
app.use("/paymentmethodspublic", paymentMethodsPublicRouter);
app.use("/", defaultRouter);

app.listen(port, () => {
  console.log("sever is runnin port: " + port);
});
