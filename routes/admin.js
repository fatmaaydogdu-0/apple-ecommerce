const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");
const { upload } = require("../helpers/image-upload");

// admin home
router.get("/", isAdmin, adminController.admin_home);

// ürün listesi
router.get("/products", isAdmin, adminController.get_products);

// ürün oluştur
router.get("/product/create", isAdmin, adminController.get_product_create);
router.post(
  "/product/create",
  isAdmin,
  upload.single("image"),
  adminController.post_product_create
);

// ürün düzenle
router.get("/product/edit/:id", isAdmin, adminController.get_product_edit);
router.post(
  "/product/edit/:id",
  isAdmin,
  upload.single("image"),
  adminController.post_product_edit
);

// Ürün sil
router.post(
  "/product/delete/:id",
  isAdmin,
  adminController.post_product_delete
);

module.exports = router;