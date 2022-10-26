import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserControllers.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const route = express.Router();

route.get("/", verifyUser, adminOnly, getUsers);
route.get("/:id", verifyUser, adminOnly, getUserById);
route.post("/", verifyUser, adminOnly, createUser);
route.patch("/:id", verifyUser, adminOnly, updateUser);
route.delete("/:id", verifyUser, adminOnly, deleteUser);

export default route;
