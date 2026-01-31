const Product = require("../models/product");

// SEPETE EKLE
exports.add_to_cart = async (req, res) => {
  const productId = req.body.productId;
  const product = await Product.findByPk(productId);

  if (!product) {
    return res.status(404).redirect("/");
  }

  let cart = req.session.cart;

  if (!cart) {
    cart = { items: {} };
  }

  if (cart.items[productId]) {
    cart.items[productId].quantity += 1;
  } else {
    cart.items[productId] = {
      product: product,
      quantity: 1
    };
  }

  req.session.cart = cart;

  // başarılı işlem 
  res.status(302).redirect("/cart");
};

// SEPETI GÖRÜNTÜLE
exports.get_cart = (req, res) => {
  let cart = req.session.cart;

  if (!cart) {
    cart = { items: {} };
  }

  let subtotal = 0;
  let tax = 50;
  let shipping = 29;

  for (let id in cart.items) {
    let item = cart.items[id];
    subtotal += item.product.price * item.quantity;
  }

  let total = subtotal + tax + shipping;

  res.status(200).render("cart/cart-basket", {
    title: "Sepetim",
    cart: cart,
    subtotal: subtotal,
    tax: tax,
    shipping: shipping,
    total: total
  });
};

// AZALT
exports.post_decrease = (req, res) => {
  const productId = req.params.id;
  let cart = req.session.cart;

  if (!cart || !cart.items[productId]) {
    return res.status(400).redirect("/cart");
  }

  cart.items[productId].quantity -= 1;

  if (cart.items[productId].quantity <= 0) {
    delete cart.items[productId];
  }

  req.session.cart = cart;

  res.status(302).redirect("/cart");
};

// URUNU SEPETTEN SIL
exports.post_remove = (req, res) => {
  const productId = req.params.id;
  let cart = req.session.cart;

  if (!cart || !cart.items[productId]) {
    return res.status(400).redirect("/cart");
  }

  delete cart.items[productId];

  req.session.cart = cart;

  res.status(302).redirect("/cart");
};