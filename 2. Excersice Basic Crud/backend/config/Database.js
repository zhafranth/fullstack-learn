import { Sequelize } from "sequelize";

const db = new Sequelize("exercise_crud_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
