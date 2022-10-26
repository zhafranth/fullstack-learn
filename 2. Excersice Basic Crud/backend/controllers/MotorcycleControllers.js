import Motorcycle from "../models/MotorcycleModel.js";

export const getMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll();

    return res.status(200).json({
      data: motorcycles,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMotorcycleDetail = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOne({
      where: req.params.id,
    });

    if (!motorcycle) {
      return res.status(400).json({
        message: "cannot find id!",
      });
    }

    return res.status(200).json({
      data: motorcycle,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMotorcycle = async (req, res) => {
  try {
    await Motorcycle.create(req.body);

    return res.status(200).json({
      message: "success add motorcycle",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMotocycle = async (req, res) => {
  try {
    await Motorcycle.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Success udpate motorcycle",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMotorcycle = async (req, res) => {
  try {
    await Motorcycle.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "succes delete motorcycle",
    });
  } catch (error) {
    console.log(error);
  }
};
