import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript'
import User from './User.model'
import CartItem from './CartItem.model'

@Table({
  tableName: 'carts',
  timestamps: true
})
class Cart extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare address: string

  @Column({
    type: DataType.ENUM('pending', 'ready', 'shippeed'),
    allowNull: false,
    defaultValue: 'pending'
  })
  declare status: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare userUuid: string

  @HasMany(() => CartItem)
  items: CartItem[]

  @BelongsTo(() => User)
  user: User
}

export default Cart
