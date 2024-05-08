import * as dotenv from "dotenv";
import {LastNameServiceImpl} from "./service/impl/LastNameServiceImpl";

dotenv.config({
  path: process.env.NODE_ENV === 'production' ?
   './.env.prod' : './.env.dev'
});

(async () => {
  console.log("start script")
  const lastNameService = new LastNameServiceImpl()
  await lastNameService.getLastName()
  console.log("end script")
})();
