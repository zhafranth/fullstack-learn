import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role", "url"],
    });
    return res.status(200).json({
      message: "Success get all users",
      data: response,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "name", "email", "role", "url"],
    });

    return res.status(200).json({
      message: "Success get detail article",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword)
    return res
      .status(404)
      .json({ message: "Password dan Confirmation Password tidak sama!" });

  const hashPassword = await argon2.hash(password);

  if (req.files === null)
    return res.status(400).json({ message: "No profile picture uploaded" });

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
      await User.create({
        name,
        email,
        password: hashPassword,
        role,
        image: fileName,
        url,
      });

      return res.status(201).json({ message: "Register berhasil" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user)
    return res.status(404).json({ message: "User not found!", status: 404 });
  const { name, email, password, confPassword, role } = req.body;

  let hasPassword;

  if (password === "" || password === null) {
    hasPassword = user.password;
  } else {
    hasPassword = await argon2.hash(password);
  }

  if (password !== confPassword)
    return res
      .status(404)
      .json({ message: "Password and Confirmation Password Not Match!" });

  let fileName;

  if (req.files === null) {
    fileName = user.image;
  } else {
    const file = req.files.file;

    const fileSize = file.data.length;
    const fileExt = path.extname(file.name);
    fileName = file.md5 + fileExt;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(fileExt.toLocaleLowerCase())) {
      return res.status(400).json({ message: "Invalid image", status: 400 });
    }

    if (fileSize > 5000000) {
      return res.status(400).json({ message: "Image must be less than 5mb" });
    }

    const filePath = `./public/images/${user.image}`;
    fs.unlinkSync(filePath);

    file.mv(`./public/images/${fileName}`, async (error) => {
      if (error) return res.status(500).json(error.message);
    });
  }
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await user.update({
      name,
      email,
      password: hasPassword,
      role,
      image: fileName,
      url,
    });
    return res.status(200).json({ message: "Successfuly update user" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user)
    return res.status(404).json({ message: "User not found!", status: 404 });
  try {
    await user.destroy();
    return res
      .status(200)
      .json({ message: "Successfuly delete user", status: 200 });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
