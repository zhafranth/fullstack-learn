import Car from "../models/CarModel.js";

export const getCars = async (req, res) => {
  try {
    let Cars;
    console.log(req.query);
    if (req.query.condition) {
      Cars = await Car.findAll({
        where: {
          condition: req.query.condition,
        },
      });
    } else {
      Cars = await Car.findAll();
    }

    return res.status(200).json({
      data: Cars,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCarDetail = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    return res.status(200).json({
      data: car,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCar = async (req, res) => {
  try {
    await Car.create(req.body);

    return res.status(200).json({
      message: "Success add car",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return req.status(400).json({
        message: "cannot find id!",
      });
    }

    await car.update(req.body);

    return res.status(200).json({
      message: "Success update car",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = async (req, res) => {
  try {
    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "success delete car",
    });
  } catch (error) {
    console.log(error);
  }
};
