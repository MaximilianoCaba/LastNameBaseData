import {LastNameDto} from "../../dto/LastNameDto";
import {ScrappingService} from "../ScrappingService";
import {CountryDto} from "../../dto/CountryDto";
import {Puppeteer} from "../../helper/Puppeteer";

export class ScrappingServiceImpl extends Puppeteer implements ScrappingService {

  public async getLastNameFromWeb(countryDto: CountryDto): Promise<LastNameDto[]> {

    const page = await this.getNewPage();
    const allChars = 'abcdefghijklmnopqrstuvwxyz';

    const lastNameDtoList: LastNameDto[] = [];

    for (const char of allChars) {
      const url = `${process.env.URL_DB_LAST_NAME}/${countryDto.countryName}/${char}`
      console.log(`Navigating: ${url}`)
      await page.goto(url);

      await page.waitForSelector('.list-item.col-lg-4.col-xs-6.mb-2');
      const lastNameElements = await page.$$('.list-item.col-lg-4.col-xs-6.mb-2');

      console.log(`last name founded: [${lastNameElements.length}] with letter [${char}]`)

      for (const element of lastNameElements) {
        const lastNameText = await element.evaluate(el => el.textContent);
        const [last_name, counterpointed] = lastNameText.split(' (');
        const count = parseInt(counterpointed.replace(')', ''), 10);

        lastNameDtoList.push({
          last_name,
          count,
          country_code: countryDto.countryCode,
        })
      }
    }
    return lastNameDtoList;
  }
}