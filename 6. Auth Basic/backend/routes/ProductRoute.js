import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/ProductControllers.js";
import { verifyUser } from "../middleware/AuthUser.js";

const route = express.Router();

route.get("/", verifyUser, getProducts);
route.get("/:id", verifyUser, getProductById);
route.post("/", verifyUser, createProduct);
route.patch("/:id", verifyUser, updateProduct);
route.delete("/:id", verifyUser, deleteProduct);

export default route;
