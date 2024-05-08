import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class LastName extends Model {
  public id!: string
  public lastName!: string;
  public forceToSearch!: boolean;
  public readonly createdAt!: number;
  public readonly updatedAt!: number;
}

LastName.init(
 {
   id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     primaryKey: true,
   },
   lastName: {
     type: DataTypes.STRING,
     allowNull: false,
     field: 'last_name',
     unique: true
   },
   forceToSearch: {
     type: DataTypes.BOOLEAN,
     defaultValue: false,
     field: 'force_to_search',
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