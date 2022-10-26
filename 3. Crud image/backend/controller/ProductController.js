import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "No file upload!" });

  const name = req.body.name;
  const file = req.files.file;

  const fileSize = file.data.length; //get size file
  const fileExt = path.extname(file.name); //get extension file
  const fileName = file.md5 + fileExt; //change format name
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; //store url
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(fileExt.toLowerCase())) {
    return res.status(400).json({
      message: "Invalid images",
    });
  }

  if (fileSize > 5000000) {
    return res.status(400).json({
      message: "Image must be less than 5mb",
    });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      await Product.create({ name: name, image: fileName, url: url });

      return res.status(200).json({
        message: "success create product",
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(400).json({ message: "cannot find id" });

  let fileName = "";

  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;

    const fileSize = file.data.length; //get size file
    const fileExt = path.extname(file.name); //get extension file
    fileName = file.md5 + fileExt; //change format name
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(fileExt.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid images",
      });
    }

    if (fileSize > 5000000) {
      return res.status(400).json({
        message: "Image must be less than 5mb",
      });
    }

    // Sebelum image disimpan difolder, file lama bakal di hapus
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath); //to remove file/images on folder public/images

    // Simpan file/image ke dalam storage
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }
  const name = req.body.name;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await product.update({ name: name, image: fileName, url: url });

    return res.status(200).json({ message: "Success update product" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(400).json({ message: "cannot find id" });
  try {
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath); //to remove file/images on folder public/images

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      message: "Success deleted product",
    });
  } catch (error) {
    console.log(error.message);
  }
};
