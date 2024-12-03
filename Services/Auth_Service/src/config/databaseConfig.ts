import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: process.env.DB_DIALECT as any,
    logging: false,
  }
);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync({ alter: true });
    console.log("Models synchronized!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export { sequelize, startServer };
