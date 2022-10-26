import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default User;

(async () => {
  await db.sync();
})();
