const Product = require("../models/productmodel");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const ApiFeature = require("../utils/apifeature");

// Create product -- Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ApiError("Unable to create product", 400));
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product has been created"));
});

// Get all products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const apiFeature = new ApiFeature(Product.find(), req.query).search().filter();

  const products = await apiFeature.query;
  const count = products.length;

  if (!products || products.length === 0) {
    return next(new ApiError("We had some trouble fetching the products", 404));
  }

  return res.status(200).json( new ApiResponse(200, products, "Response retrived", count));
});

// Get product by ID
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  return res.status(200).json(new ApiResponse(200, product));
});

// Update product -- Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json(new ApiResponse(200, updatedProduct));
});

// Delete product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  await product.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully"));
});
