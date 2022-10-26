import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controller/ProductController.js";

const route = express.Router();

route.get("/", getProducts);
route.get("/:id", getProductById);
route.post("/", createProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

export default route;
