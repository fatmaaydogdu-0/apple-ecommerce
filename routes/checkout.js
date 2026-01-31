const express = require("express");
const router = express.Router();

router.get("/step1", (req, res) => {
  res.render("checkout/step1", {
    title: "Checkout - Step 1"
  });
});

router.get("/step2", (req, res) => {
    res.render("checkout/step2", {
        title: "Checkout - Step 2"
    });
}
);

router.get("/step3", (req, res) => {
  const cart = req.session.cart;

  let subtotal = 0;
  const tax = 50;
  const shipping = 29;

  if (cart && cart.items) {
    Object.values(cart.items).forEach(item => {
      subtotal += item.product.price * item.quantity;
    });
  }

  const total = subtotal + tax + shipping;

  res.render("checkout/step3", {
    title: "Checkout - Step 3",
    cart,
    subtotal,
    tax,
    shipping,
    total
  });
});


module.exports = router;