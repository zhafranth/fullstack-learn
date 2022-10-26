import express from "express";
import {
  getMotorcycles,
  addMotorcycle,
  deleteMotorcycle,
  getMotorcycleDetail,
  updateMotocycle,
} from "../controllers/MotorcycleControllers.js";

const route = express.Router();

route.get("/", getMotorcycles);
route.get("/:id", getMotorcycleDetail);
route.post("/", addMotorcycle);
route.put("/", updateMotocycle);
route.delete("/", deleteMotorcycle);

export default route;
