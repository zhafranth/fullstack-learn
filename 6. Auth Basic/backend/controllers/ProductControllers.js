import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        include: {
          model: User,
          attributes: ["name", "email"],
        },
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        include: {
          model: User,
          attributes: ["name", "email"],
        },
        where: {
          userId: req.userId,
        },
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({ message: "Product tidak ada!" });
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        where: {
          id: product.id,
        },
        include: {
          model: User,
          attributes: ["name", "email"],
        },
      });
    } else {
      response = await Product.findOne({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }], // query buat nyari product dengan id yg sama dan user id yang sama
        },
        include: {
          model: User,
          attributes: ["name", "email"],
        },
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Product.create({
      name,
      price,
      userId: req.userId,
    });

    return res.status(201).json({ message: "Success Create Product" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({ message: "Product tidak ada!" });
    const { name, price } = req.body;
    if (req.role === "admin") {
      await Product.update(
        { name, price },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ message: "Akses terlarang!" });
      await Product.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    return res.status(200).json({ message: "Success update product" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(200).json({ message: "Product tidak ada!" });
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ message: "Akses terlarang!" });
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    return res.status(200).json({ message: "Success delete product" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
