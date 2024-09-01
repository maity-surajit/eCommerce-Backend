const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
const {isAuthenticateUser} = require("../middlewares/auth")

const router = express.Router();

router.route("/product").get(isAuthenticateUser, getAllProducts);

router.route("/product/new").post(createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProduct);

module.exports = router;
