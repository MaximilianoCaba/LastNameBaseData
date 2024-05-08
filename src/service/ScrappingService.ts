import {CountryDto} from "../dto/CountryDto";

export interface ScrappingService {

  getLastNameFromWeb(countryDto: CountryDto);
}