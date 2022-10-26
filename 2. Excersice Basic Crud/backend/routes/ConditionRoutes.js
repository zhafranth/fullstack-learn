import express from "express";
import {
  createCondition,
  deleteCondition,
  getConditionById,
  getConditions,
  updateCondition,
} from "../controllers/ConditionControllers.js";

const route = express.Router();

route.get("/", getConditions);
route.get("/:id", getConditionById);
route.post("/", createCondition);
route.put("/:id", updateCondition);
route.delete("/:id", deleteCondition);

export default route;
