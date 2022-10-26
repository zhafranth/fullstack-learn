import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Condition = db.define(
  "conditions",
  {
    type: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Condition;

(async () => {
  await db.sync();
})();
