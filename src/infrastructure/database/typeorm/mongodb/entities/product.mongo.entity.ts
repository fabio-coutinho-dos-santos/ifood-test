import { Column, Entity, ObjectIdColumn } from "typeorm";
import Category from "../../../../../domain/category/category.entity";

@Entity({ name: "products" })
export class ProductModel {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: "string",
  })
  ownerId: string;

  @Column({
    type: "number",
  })
  price: number;

  @Column({
    type: "string",
  })
  title: string;

  @Column({
    type: "string",
  })
  description: string;

  @Column({})
  category: Category;
}
