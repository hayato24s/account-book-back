import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RecordType } from "../../entity/record";
import { CategoryModel } from "./category";

@Entity({
  name: "records",
})
export class RecordModel {
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
    name: "category_id",
    type: "varchar",
    length: "36",
  })
  categoryId!: string;

  @Column({
    name: "type",
    type: "enum",
    enum: ["Expense", "Income"],
  })
  type!: RecordType;

  @Column({
    name: "amount",
    type: "int",
    unsigned: true,
  })
  amount!: number;

  @Column({
    name: "memo",
    type: "varchar",
    length: "255",
  })
  memo!: string;

  @Column({
    name: "date",
    type: "date",
  })
  date!: string;

  @ManyToOne((type) => CategoryModel, (category) => category.records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "category_id" })
  category!: CategoryModel;
}
