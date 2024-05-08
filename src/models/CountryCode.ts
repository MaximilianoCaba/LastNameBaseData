import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../db'

export class CountryCode extends Model {
  public id!: string;
  public countryCode!: string;
  public countryName!: string;
}

CountryCode.init(
 {
   id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   countryCode: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     field: 'country_code',
   },
   countryName: {
     type: DataTypes.STRING,
     allowNull: false,
     field: 'country_name',
   },
 },
 {
   tableName: 'country_code',
   sequelize,
   modelName: 'CountryCode',
   underscored: true,
 }
)