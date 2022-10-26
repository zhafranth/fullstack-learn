import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user)
    return res
      .status(404)
      .json({ message: "Email belum terdaftar", status: 404 });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(404).json({ message: "Password salah", status: 404 });

  req.session.userId = user.uuid;

  return res.status(200).json({
    message: "Success login",
    status: 200,
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ message: "Mohon login ke akun anda!" });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
    attributes: ["uuid", "email", "role", "name"],
  });

  if (!user)
    return res
      .status(404)
      .json({ message: "User tidak ditemukan", status: 404 });

  return res.status(200).json({
    message: "Success get users info",
    data: user,
    status: 200,
  });
};

export const Logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res
        .status(400)
        .json({ message: "Tidak dapat logout", status: 200 });
    return res.status(200).json({ message: "Logout success", status: 200 });
  });
};
