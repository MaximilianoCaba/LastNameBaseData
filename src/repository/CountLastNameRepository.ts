import {Optional, Transaction} from "sequelize";
import {CountLastName} from "../models/CountLastName";

export class CountLastNameRepository {

  private readonly transaction: Transaction | undefined

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.transaction = transaction
    }
  }

  public async bulkCreate(lastNameDtoList: Optional<any, string>[]): Promise<void> {

    await CountLastName.bulkCreate(lastNameDtoList, {
      transaction: this.transaction,
      updateOnDuplicate: ["countryCodeId", "lastNameId", "count"]
    })
  }

}