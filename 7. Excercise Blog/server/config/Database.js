import { Sequelize } from "sequelize";

const db = new Sequelize("article", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
