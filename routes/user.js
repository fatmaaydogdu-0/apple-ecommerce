const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// anasayfa
router.get("/", userController.homepage);

// ürün arama
router.get("/products/search", userController.searchProducts);

// tüm ürünler
router.get("/products", userController.productsList);

// ürün detayı
router.get("/product/:id", userController.productDetail);

module.exports = router;