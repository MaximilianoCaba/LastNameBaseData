import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import {LastName} from "./LastName";
import {CountryCode} from "./CountryCode";

export class CountLastName extends Model {
  public id!: string
  public countryCodeId!: string;
  public lastNameId!: string;
  public count!: number;
  public readonly createdAt!: number;
  public readonly updatedAt!: number;
}

CountLastName.init(
 {
   id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     primaryKey: true,
   },
   countryCodeId: {
     type: DataTypes.INTEGER,
     references: {
       model: 'CountryCode',
       key: 'id',
     },
   },
   lastNameId: {
     type: DataTypes.UUID,
     references: {
       model: 'LastName',
       key: 'id',
     },
   },
   count: {
     type: DataTypes.NUMBER,
     allowNull: false,
   },
 },
 {
   tableName: 'count_last_name',
   sequelize,
   modelName: 'CountLastName',
   timestamps: true,
   underscored: true,
   indexes: [
     {
       unique: true,
       fields: ['country_code_id', 'last_name_id']
     }
   ]
 }
)

CountLastName.belongsTo(LastName, {
  foreignKey: 'lastNameId',
  as: 'count_last_name'
});
LastName.hasMany(CountLastName, {
  sourceKey: 'id',
  foreignKey: 'lastNameId',
  as: 'last_name_count'
});

CountLastName.belongsTo(CountryCode, {
  foreignKey: 'countryCodeId',
  as: 'country_count_last_name'

});
CountryCode.hasMany(CountLastName, {
  sourceKey: 'id',
  foreignKey: 'countryCodeId',
  as: 'count_last_name_country'
});