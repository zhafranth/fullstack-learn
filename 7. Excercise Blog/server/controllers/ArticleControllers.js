import Article from "../models/ArticleModel.js";
import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";
import { Op } from "sequelize";

export const getArticles = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "guest") {
      response = await Article.findAll({
        attributes: ["uuid", "title", "content", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "email", "url"],
          },
          {
            model: Category,
            attributes: ["name", "color"],
          },
        ],
      });
    } else {
      console.log("condition 2");
      response = await Article.findAll({
        attributes: ["uuid", "title", "content", "createdAt"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "email", "url"],
          },
          {
            model: Category,
            attributes: ["name", "color"],
          },
        ],
      });
    }
    return res.status(200).json({
      message: "Success get all articles",
      data: response,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      attributes: ["uuid", "title", "content", "createdAt"],
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["uuid", "name", "email", "url"],
        },
        {
          model: Category,
          attributes: ["name", "color"],
        },
      ],
    });

    return res.status(200).json({
      message: "Success get article",
      data: article,
      status: 200,
    });
  } catch (error) {
    return req.status(500).json(error.message);
  }
};

export const createArticle = async (req, res) => {
  const { title, content, category } = req.body;
  const myCategory = await Category.findByPk(category);
  if (!myCategory)
    return res.status(404).json({
      message: "Incorrect value category",
      status: 404,
    });
  try {
    await Article.create({
      title,
      content,
      categoryId: category,
      userId: req.userId,
    });
    return res.status(200).json({
      message: "Success create article",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!article)
      return res.status(400).json({
        message: "Article not found!",
      });

    const { title, content, category } = req.body;

    const myCategory = await Category.findByPk(category);
    if (!myCategory)
      return res
        .status(404)
        .json({ message: "Inccorect value category", status: 404 });

    if (req.role === "admin") {
      await article.update({
        title,
        content,
        categoryId: category,
      });

      return res
        .status(200)
        .json({ message: "Success update article", status: 200 });
    } else {
      await Article.update({
        where: {
          [Op.and]: [{ id: product.id, userId: req.userId }],
        },
      });
      return res
        .status(200)
        .json({ message: "Success update article", status: 200 });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!article)
      return res.status(400).json({
        message: "Article not found!",
      });

    if (req.role === "admin") {
      await article.destroy();

      return res.status(200).json({
        message: "Success delete article",
        status: 200,
      });
    } else {
      if (req.userId !== article.userId)
        return res.status(403).json({
          message: "Akses terlarang",
          status: 403,
        });
      await Article.destroy({
        where: {
          [Op.and]: [{ userId: req.userId }, { id: product.id }],
        },
      });
      return res.status(200).json({
        message: "Success delete article",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
