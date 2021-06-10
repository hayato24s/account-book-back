import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RecordModel } from "./record";

@Entity({
  name: "categories",
})
export class CategoryModel {
  @PrimaryColumn({
    name: "id",
    type: "varchar",
    length: "36",
  })
  id!: string;

  @Column({
    name: "user_id",
    type: "varchar",
    length: "255",
  })
  userId!: string;

  @Column({
    name: "name",
    type: "varchar",
    length: "255",
  })
  name!: string;

  @Column({
    name: "color",
    type: "char",
    length: "6",
  })
  color!: string;

  @OneToMany((type) => RecordModel, (record) => record.category)
  records!: RecordModel[];
}
