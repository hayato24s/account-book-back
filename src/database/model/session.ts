import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "sessions",
})
export class SessionModel {
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
    name: "expired_at",
    type: "datetime",
  })
  expiredAt!: Date;
}
