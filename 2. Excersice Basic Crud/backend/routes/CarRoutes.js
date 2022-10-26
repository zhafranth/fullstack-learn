import express from "express";
import {
  getCars,
  addCar,
  deleteCar,
  getCarDetail,
  updateCar,
} from "../controllers/CarControllers.js";

const route = express.Router();

route.get("/", getCars);
route.get("/:id", getCarDetail);
route.post("/", addCar);
route.put("/:id", updateCar);
route.delete("/:id", deleteCar);

export default route;
