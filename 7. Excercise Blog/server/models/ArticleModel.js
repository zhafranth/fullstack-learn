import { DataTypes } from "sequelize";
import Category from "./CategoryModel.js";
import User from "./UserModel.js";
import db from "../config/Database.js";

const Article = db.define(
  "articles",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Category.hasMany(Article);
User.hasMany(Article);
Article.belongsTo(Category, { foreignKey: "categoryId" });
Article.belongsTo(User, { foreignKey: "userId" });

export default Article;
