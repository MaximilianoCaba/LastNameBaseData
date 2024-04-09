import {LastName} from "../models/LastName";
import {Transaction} from "sequelize";
import {LastNameDto} from "../dto/LastNameDto";

export class LastNameRepository {

  private readonly transaction: Transaction | undefined

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.transaction = transaction
    }
  }

  public async bulkCreate(lastNameDtoList: LastNameDto[]): Promise<LastName[]> {
    return LastName.bulkCreate(lastNameDtoList.map((lastNameDto) => ({
      last_name: lastNameDto.last_name,
      country_code: lastNameDto.country_code,
      count: lastNameDto.count,
    })), {
      transaction: this.transaction,
      updateOnDuplicate: ["last_name", "country_code"]
    })
  }

}