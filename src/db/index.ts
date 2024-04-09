import { Sequelize } from 'sequelize'
import * as dotenv from "dotenv";

dotenv.config({ path: '.env.prod'});
function getSequelize(): Sequelize {

  const dataBase = process.env.DB_DATABASE ? process.env.DB_DATABASE : "database"
  const user = process.env.DB_USER ? process.env.DB_USER : "user"
  const password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "password"
  const host = process.env.DB_HOST ? process.env.DB_HOST : "localhost"

  return new Sequelize(dataBase, user, password, {
    host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    port: 5432,
    logging: false,
  });
}

export const sequelize = getSequelize()