import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Motorcycle = db.define(
  "motorcylcles",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Motorcycle;

(async () => {
  await db.sync();
})();
