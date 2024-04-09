import {scrapLastName} from "./service/ScrappingService";
import * as dotenv from "dotenv";

dotenv.config({ path: '.env.prod'});

scrapLastName();

