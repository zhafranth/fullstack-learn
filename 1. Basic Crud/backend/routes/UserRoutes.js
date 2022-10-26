import express from "express";
import {
  getUsers,
  getUserById,
  addUser,
  delUser,
  updateUser,
} from "../controllers/UserControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", delUser);

export default router;
