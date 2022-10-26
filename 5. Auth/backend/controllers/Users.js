import Users from "../models/UsersModel.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "email", "name"],
    });

    return res.json({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, conf_password } = req.body;
  if (password !== conf_password)
    return res
      .status(400)
      .json({ message: "Password and confirmatin password not match" });
  const salt = await bycrypt.genSalt();
  const hashPassword = await bycrypt.hash(password, salt);

  try {
    await Users.create({
      name,
      email,
      password: hashPassword,
    });
    return res.json({
      message: "Success create accont",
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user)
      return res.status(400).json({
        message: "Email not found !",
      });

    // console.log(user);
    const match = await bycrypt.compare(req.body.password, user.password);

    if (!match)
      return res.status(400).json({
        message: "Password not match",
      });

    const { email, name, id } = user;
    const accessToken = jwt.sign(
      { id, email, name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { id, email, name },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await user.update({
      refresh_token: refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //cookie will be storage only one day
    });
    return res.json({
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(403);
  await user.update({
    refresh_token: null,
  });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
