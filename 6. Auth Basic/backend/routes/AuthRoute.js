import express from "express";
import { Login, Logout, Me } from "../controllers/AuthControllers.js";

const route = express.Router();

route.get("/me", Me);
route.post("/login", Login);
route.delete("/logout", Logout);

export default route;
