import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Car = db.define(
  "cars",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    condition: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Car;

(async () => {
  await db.sync();
})();
