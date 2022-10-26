import express from "express";
import { Login, Logout, Me } from "../controllers/AuthControllers.js";

const route = express.Router();

route.post("/login", Login);
route.get("/me", Me);
route.delete("/logout", Logout);

export default route;
