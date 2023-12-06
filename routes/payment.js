const router = require("express").Router();
const Paymentmethods = require("../models/paymentmethods.model");
const Products = require("../models/products.model");
const Cargoes = require("../models/cargoes.model");
const Orders = require("../models/orders.model");

const filter_array_in_obj = (arr, criteria) => {
  return arr.filter(function (obj) {
    return Object.keys(criteria).every(function (c) {
      return obj[c] == criteria[c];
    });
  });
};

const getSaveProductsBaskettoOrders = async (
  data = [],
  products = [],
  allBasket = []
) => {
  const BasketAllProducts = [];

  products.map(async (x) => {
    updateProductSaleqty(x.product_id, x.qty);

    const array = data.find((y) => y._id == x.product_id);

    if (array) {
      const resData = array;
      const errorArray = [];
      if (x.selectedVariants !== undefined) {
        const priceMath = filter_array_in_obj(
          resData.variant_products,
          x.selectedVariants
        );

        updateProductQtyVariant(x.product_id, x.selectedVariants, x.qty);

        BasketAllProducts.push({
          _id: resData._id,
          title: resData.title,
          selectedVariants: x.selectedVariants,
          qty: x.qty,
          price: priceMath[0].price,
          before_price: priceMath[0].before_price,
          total_price: x.qty * priceMath[0].price,
          total_discount: x.qty * priceMath[0].before_price,
          error: errorArray,
          seo: resData.seo,
        });
      } else {
        updateProductQtyNormal(x.product_id, x.qty);

        BasketAllProducts.push({
          _id: resData._id,
          title: resData.title,
          selectedVariants: x.selectedVariants,
          qty: x.qty,
          price: resData.price,
          before_price: resData.before_price,
          total_price: x.qty * resData.price,
          total_discount: x.qty * resData.before_price,
          error: errorArray,
          seo: resData.seo,
        });
      }
    }
  });
  allBasket[0].products = BasketAllProducts;
  allBasket[0].orderstatus_id = "6131278e07625b5635a8709f";
  allBasket[0].paymentmethods_id = "6132787ae4c2740b7aff7320";
  allBasket[0].shipping_address =
    allBasket[0].shipping_address.address +
    " " +
    allBasket[0].shipping_address.village_id +
    " " +
    allBasket[0].shipping_address.district_id +
    " " +
    allBasket[0].shipping_address.town_id +
    " " +
    allBasket[0].shipping_address.city_id;
  allBasket[0].billing_address =
    allBasket[0].billing_address.address +
    " " +
    allBasket[0].billing_address.village_id +
    " " +
    allBasket[0].billing_address.district_id +
    " " +
    allBasket[0].billing_address.town_id +
    " " +
    allBasket[0].billing_address.city_id;

  const dataRes = new Orders(allBasket[0]).save();
  return dataRes;
};

const getBasketProductsPrice = async (data = [], products = []) => {
  let basketTotalPrice = 0;

  products.map((x) => {
    const array = data.find((y) => y._id == x.product_id);
    if (array) {
      const resData = array;
      if (x.selectedVariants !== undefined) {
        const priceMath = filter_array_in_obj(
          resData.variant_products,
          x.selectedVariants
        );
        basketTotalPrice = basketTotalPrice + x.qty * priceMath[0].price;
      } else {
        basketTotalPrice = basketTotalPrice + x.qty * resData.price;
      }
    }
  });

  return basketTotalPrice;
};

const calculateOrderAmount = (ids, items) => {
  const price = Products.find({ _id: ids })
    .then(async (res) => await getBasketProductsPrice(res, items))
    .then((price) => price);
  return price;
};

const calculateCargoes = async (cargoes_id) => {
  if (cargoes_id) {
    const cargo_price = await Cargoes.find({ _id: cargoes_id });
    return cargo_price[0].price;
  } else {
    return 0;
  }
};

const updateProductSaleqty = (id, qty) => {
  Products.updateOne(
    { _id: id },
    {
      $inc: { saleqty: qty },
    }
  ).then((data) => data);
};

const updateProductQtyNormal = (id, qty) => {
  Products.updateOne(
    { _id: id },
    {
      $inc: { qty: -qty },
    }
  ).then((data) => data);
};

const updateProductQtyVariant = (id, variants, qty) => {
  Products.updateOne(
    {
      $and: [
        {
          _id: id,
        },
        {
          variant_products: {
            $elemMatch: variants,
          },
        },
      ],
    },
    {
      $inc: {
        "variant_products.$.saleqty": qty,
        "variant_products.$.qty": -qty,
      },
    }
  ).then((data) => console.log(data));
  return;
};

// router.route("/updateqty/:id/:qty").get((req, res) => {
//     const data = updateProductSaleqty(req.params.id, req.params.qty)
//     res.json((data))
// })

router.route("/stripe").post(async (req, res) => {
  Paymentmethods.findById("6132787ae4c2740b7aff7320").then(async (resPay) => {
    if (resPay.secret_key != "" && req.body.items.length > 0) {
      const stripe = require("stripe")(resPay.secret_key);
      const { items, ids, cargoes_id } = req.body;
      const price = await calculateOrderAmount(ids, items);
      const cargo_price = await calculateCargoes(cargoes_id);

      // Create a PaymentIntent with the order amount and currency
      const total_price = Math.round((price + cargo_price) * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: total_price,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
      });

      return await {
        basket: req.body.allBasket,
        items: items,
        ids: ids,
        clientSecret: paymentIntent.client_secret,
      };
    }
  });
});

router.route("/stripeokey").post(async (req, res) => {
  const { ids, items, basket } = req.body;

  Products.find({ _id: ids }).then(async (resData) => {
    const dataNewOrder = await getSaveProductsBaskettoOrders(
      resData,
      items,
      basket
    );
    res.json(dataNewOrder);
  });
});

router.route("/stripeokeyconfirm/:pi_key").get(async (req, res) => {
  Paymentmethods.findById("6132787ae4c2740b7aff7320").then(async (resPay) => {
    if (resPay.secret_key != "" && req.params.pi_key != "") {
      const stripe = require("stripe")(resPay.secret_key);

      const paymentIntent = await stripe.paymentIntents.retrieve(
        req.params.pi_key
      );

      return res.json(paymentIntent);
    }
  });
});
router.route("/stripeconfirm/:payment_intent/:ordernumber").get((req, res) => {
  Orders.find(req.params)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        messagge: "Error: " + err,
        variant: "error",
      })
    );
});

module.exports = router;
