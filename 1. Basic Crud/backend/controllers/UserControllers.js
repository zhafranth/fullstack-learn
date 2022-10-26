import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    // const user = await User.findByPk(req.params.id); atau boleh kyk dibawah ini
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return res.status(201).json({
        status: 201,
        message: "Cannot find with spesific id",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Success get detail user",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (req, res) => {
  try {
    await User.create(req.body);
    return res.status(200).json({
      status: 200,
      message: "success add user",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      message: "Success Update",
    });
  } catch (error) {}
};

export const delUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    return res.status(200).json({
      message: "Success delete user",
    });
  } catch (error) {
    console.log(error);
  }
};
