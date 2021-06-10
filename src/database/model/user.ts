import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "users",
})
export class UserModel {
  @PrimaryColumn({
    name: "id",
    type: "varchar",
    length: "255",
  })
  id!: string;

  @Column({
    name: "password",
    type: "varchar",
    length: "20",
  })
  password!: string;
}
