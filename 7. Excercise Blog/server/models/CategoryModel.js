import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Category = db.define(
  "categories",
  {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default Category;
