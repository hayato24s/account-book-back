import { getRepository, Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { BadRequestError, NotFoundError } from "~/error";
import { RecordModel } from "../database/model/record";
import { Record } from "../entity/record";
import { IRecordRepogitory } from "../interface/IRecordRepogitory";
import { checkObjectHasProperty } from "./utils";

export class RecordRepogitory implements IRecordRepogitory {
  private repo: Repository<RecordModel>;

  constructor() {
    this.repo = getRepository(RecordModel);
  }

  async getRecord(userId: string) {
    return this.repo.find({
      where: { userId },
      relations: ["category"],
    });
  }

  async createRecord(r: Omit<Record, "id">) {
    if (
      !checkObjectHasProperty<Omit<Record, "id">>(r, [
        "userId",
        "type",
        "amount",
        "category",
        "memo",
        "date",
      ])
    )
      throw new BadRequestError("記録の入力データが正しくありません");
    return this.repo.save(this.repo.create({ ...r, id: uuid() }));
  }

  async updateRecord(r: Record) {
    if (
      !checkObjectHasProperty<Record>(r, [
        "id",
        "userId",
        "type",
        "amount",
        "category",
        "memo",
        "date",
      ])
    )
      throw new BadRequestError("記録の入力データが正しくありません");
    const record = await this.repo.findOne(r.id);
    if (record == undefined)
      throw new NotFoundError("idに該当する記録が見つかりません");
    return this.repo.save(r);
  }

  async deleteRecord(id: string) {
    const record = await this.repo.findOne(id);
    if (record == undefined)
      throw new NotFoundError("idに該当する記録が見つかりません");
    this.repo.remove(record);
  }
}
