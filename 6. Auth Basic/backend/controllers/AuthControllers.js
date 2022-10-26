import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(400).json({ message: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(404).json({ message: "Pasword salah" });
  req.session.userId = user.uuid;
  const { uuid, name, email, role } = user;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Mohon login ke akun anda" });
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
    attributes: ["uuid", "name", "email", "role"],
  });

  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.status(200).json({
    user,
  });
};

export const Logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ message: "Tidak dapat logout" });
    res.status(200).json({ message: "Anda telah logout" });
  });
};
