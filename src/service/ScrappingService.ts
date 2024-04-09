import { launch } from 'puppeteer'
import {LastNameDto} from "../dto/LastNameDto";
import {LastNameRepository} from "../repository/LastNameRepository";
import {countryConstList} from "../consts/CountryConst";

export async function scrapLastName() {
  console.log("Start scraping")

  const browser = await launch({headless: true} )
  const page = await browser.newPage();
  const allChars = 'abcdefghijklmnopqrstuvwxyz';

  for(const countryDto of countryConstList) {
    for (const char of allChars) {
      const url = `${process.env.URL_DB_LAST_NAME}/${countryDto.countryName}/${char}`
      await page.goto(url);
      console.log(`Navigating: ${url}`)

      await page.waitForSelector('.list-item.col-lg-4.col-xs-6.mb-2');
      const lastNameElements = await page.$$('.list-item.col-lg-4.col-xs-6.mb-2');

      console.log(`last name founded: [${lastNameElements.length}] with letter [${char}]`)

      const lastNameDtoList: LastNameDto[] = [];

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

      console.log("Start saving data in DB")
      const lastNameRepository = new LastNameRepository()
      await lastNameRepository.bulkCreate(lastNameDtoList);
      console.log("Data saved!")
    }
  }

  await browser.close();
  console.log("Browser successfully")

  console.log("Finish")
}