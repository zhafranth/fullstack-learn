import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const route = express.Router();

route.get("/", verifyToken, getUsers);
route.post("/register", Register);
route.post("/login", Login);
route.get("/token", refreshToken);
route.delete("/logout", Logout);

export default route;
