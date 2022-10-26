import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategorys,
  updateCategory,
} from "../controllers/CategoryControllers.js";

import { verifyUser } from "../middleware/AuthUser.js";

const route = express.Router();

route.get("/", getCategorys);
route.get("/:id", getCategoryById);
route.post("/", verifyUser, createCategory);
route.patch("/:id", verifyUser, updateCategory);
route.delete("/:id", verifyUser, deleteCategory);

export default route;
