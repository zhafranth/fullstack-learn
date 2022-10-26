import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirmation Password tidak sama!" });

  const hashPassword = await argon2.hash(password);

  try {
    await User.create({ name, email, password: hashPassword, role });
    return res.status(201).json({ message: "Register berhasil" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(400).json({ message: "User tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;
  let hasPassword;
  if (password === "" || password === null) {
    hasPassword = user.password;
  } else {
    hasPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirmation Password tidak sama!" });
  try {
    await user.update({
      name,
      email,
      role,
      password: hasPassword,
    });
    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(400).json({ message: "User tidak ditemukan" });
  try {
    await user.destroy();

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
