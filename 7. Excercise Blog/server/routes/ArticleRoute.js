import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/ArticleControllers.js";
import { verifyUser, guestUser } from "../middleware/AuthUser.js";

const route = express.Router();

route.get("/", guestUser, getArticles);
route.get("/:id", getArticleById);
route.post("/", verifyUser, createArticle);
route.patch("/:id", verifyUser, updateArticle);
route.delete("/:id", verifyUser, deleteArticle);

export default route;
