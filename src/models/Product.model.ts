import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import CartItem from './CartItem.model'

@Table({
  tableName: 'products',
  timestamps: true
})
class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare title: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare description: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare category: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  declare price: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare stock: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare thumbnail: string

  @HasMany(() => CartItem)
  carts: CartItem[]
}

export default Product
