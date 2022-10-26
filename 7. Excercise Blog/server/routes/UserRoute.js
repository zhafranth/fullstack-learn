import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserControllers.js";
import { verifyUser } from "../middleware/AuthUser.js";

const route = express.Router();

route.get("/", verifyUser, getUsers);
route.get("/:id", verifyUser, getUserById);
route.post("/", verifyUser, createUser);
route.patch("/:id", verifyUser, updateUser);
route.delete("/:id", verifyUser, deleteUser);

export default route;
