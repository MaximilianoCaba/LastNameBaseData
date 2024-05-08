import {LastName} from "../models/LastName";
import {Optional, Transaction} from "sequelize";

export class LastNameRepository {

  private readonly transaction: Transaction | undefined

  constructor(transaction?: Transaction) {
    if (transaction) {
      this.transaction = transaction
    }
  }

  public async bulkCreate(lastNameDtoList: Optional<any, string>[]): Promise<LastName[]> {
    return LastName.bulkCreate(lastNameDtoList, {
      transaction: this.transaction,
      updateOnDuplicate: ["lastName"]
    })
  }

}