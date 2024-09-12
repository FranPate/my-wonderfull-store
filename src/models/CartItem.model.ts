import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import Cart from './Cart.model'
import Product from './Product.model'

@Table({
  tableName: 'cart_items',
  timestamps: true
})
class CartItem extends Model {
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare cartId: number

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare productId: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare quantity: number

  @BelongsTo(() => Cart)
  cart: Cart

  @BelongsTo(() => Product)
  product: Product
}

export default CartItem
