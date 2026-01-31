const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/", cartController.get_cart);

router.post("/add", cartController.add_to_cart);

router.post("/decrease/:id", cartController.post_decrease);

router.post("/remove/:id", cartController.post_remove);

module.exports = router;