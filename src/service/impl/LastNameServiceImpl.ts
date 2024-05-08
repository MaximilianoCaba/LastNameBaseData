import {LastNameService} from "../LastNameService";
import {LastNameRepository} from "../../repository/LastNameRepository";
import {LastNameDto} from "../../dto/LastNameDto";
import {Transaction} from "sequelize";
import {LastName} from "../../models/LastName";
import {CountLastNameRepository} from "../../repository/CountLastNameRepository";
import {countryConstList} from "../../consts/CountryConst";
import {ScrappingServiceImpl} from "./ScrappingServiceImpl";

export class LastNameServiceImpl implements LastNameService {

  private readonly transaction: Transaction | undefined

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.transaction = transaction
    }
  }

  public async getLastName() {
    const scrappingService = new ScrappingServiceImpl();

    for(const countryDto of countryConstList) {
      const lastNameDtoList: LastNameDto[] = await scrappingService.getLastNameFromWeb(countryDto);

      console.log("Start saving data in DB")
      const countLastNameRepository = new CountLastNameRepository(this.transaction)
      const lastNameRepository = new LastNameRepository(this.transaction)


      const lastNameList = lastNameDtoList.map((lastNameDto) => ({
        lastName: lastNameDto.last_name,
      }))

      const lastNameSalvedList: LastName[] = await lastNameRepository.bulkCreate(lastNameList);

      const countLastNameDto = lastNameSalvedList.map(lastNameSalved => ({
        countryCodeId: countryDto.id,
        lastNameId: lastNameSalved.id,
        count: lastNameDtoList.find(lastNameDto => lastNameDto.last_name == lastNameSalved.lastName)?.count || 0,
      }))

      await countLastNameRepository.bulkCreate(countLastNameDto)

      console.log("Data saved!")
    }

    await scrappingService.closeBrowser()
  }

}