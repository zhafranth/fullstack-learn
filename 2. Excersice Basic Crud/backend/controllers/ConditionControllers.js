import Condition from "../models/ConditionModel.js";

export const getConditions = async (req, res) => {
  try {
    const conditions = await Condition.findAll();
    return res.status(200).json({
      data: conditions,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getConditionById = async (req, res) => {
  try {
    const condition = await Condition.findByPk(req.params.id);
    if (!condition) {
      return res.status(400).json({
        message: "cannot find id!",
      });
    }
    return res.status(200).json({
      data: condition,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCondition = async (req, res) => {
  try {
    await Condition.create(req.body);
    return res.status(200).json({
      message: "success add condition",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCondition = async (req, res) => {
  try {
    const condition = await Condition.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!condition) {
      return res.status(400).json({
        message: "cannot find id!",
      });
    }

    await condition.update(req.body);
    return res.status(200).json({
      mesage: "success update condition",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCondition = async (req, res) => {
  try {
    await Condition.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Success delete condition",
    });
  } catch (error) {
    console.log(error);
  }
};
