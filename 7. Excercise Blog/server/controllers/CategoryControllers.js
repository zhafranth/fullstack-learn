import Category from "../models/CategoryModel.js";

export const getCategorys = async (req, res) => {
  try {
    const response = await Category.findAll();

    return res.status(200).json({
      message: "Success get all categories",
      data: response,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    return res.status(200).json({
      message: "Success get category",
      data: category,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    await Category.create({ name, color });

    return res.status(201).json({
      message: "Success create category",
      status: 201,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(400).json({ message: "Category not found" });
  const { name, color } = req.body;

  try {
    await category.update({ name, color });

    return res
      .status(200)
      .json({ message: "Success update category", status: 200 });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(400).json({ message: "Category not found" });

  try {
    await category.destroy();

    return res.status(200).json({
      message: "Success delete category",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
