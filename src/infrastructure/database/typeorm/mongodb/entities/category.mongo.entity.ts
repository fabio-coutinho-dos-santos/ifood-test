import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "categories" })
export class CategoryModel {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: "string",
  })
  ownerId: string;

  @Column({
    type: "string",
  })
  title: string;

  @Column({
    type: "string",
  })
  description: string;
}
