import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class LastName extends Model {
  public last_name!: string;
  public count!: number;
  public country_code!: string;
  public readonly createdAt!: number;
  public readonly updatedAt!: number;
}

LastName.init(
 {
   last_name: {
     type: DataTypes.STRING,
     primaryKey: true,
   },
   count: {
     type: DataTypes.NUMBER,
     allowNull: false,
   },
   country_code: {
     type: DataTypes.STRING,
     primaryKey: true,
   },
   lastUpdate: {
     type: DataTypes.DATE,
     allowNull: false
   }
 },
 {
   tableName: 'last_name',
   sequelize,
   modelName: 'LastName',
   timestamps: true,
   underscored: true,
 }
)