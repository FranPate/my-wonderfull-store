import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  PrimaryKey
} from 'sequelize-typescript'
import Cart from './Cart.model'

@Table({
  tableName: 'users',
  timestamps: true
})
class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare uuid: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare email: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare hashedPassword: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare firstName: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare lastName: string

  @Column({
    type: DataType.ENUM('admin', 'staff', 'client'),
    allowNull: false,
    defaultValue: 'client'
  })
  declare role: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  declare visibility: boolean

  @HasMany(() => Cart)
  carts: Cart[]
}

export default User
