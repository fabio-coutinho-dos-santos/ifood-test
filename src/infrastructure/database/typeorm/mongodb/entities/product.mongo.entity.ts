import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { CategoryModel } from './category.mongo.entity';

@Entity({ name: 'products' })
export class ProductModel {
  @ObjectIdColumn()
  _id: string;

  @Column({
    unique: true,
  })
  ownerId: string;

  @Column({
    type: 'number',
  })
  price: number;

  @Column({
    type: 'string',
  })
  title: string;

  @Column({
    type: 'string',
  })
  description: string;

  @Column({})
  category: CategoryModel;
}
