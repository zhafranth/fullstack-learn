import express from "express";
import { getUsers } from "../controllers/UserControllers.js";

const route = express.Router();

route.get("/", getUsers);

export default route;
