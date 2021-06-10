import { Record } from "../entity/record";

export type IRecordRepogitory = {
  getRecord(userId: string): Promise<Record[]>;
  createRecord(recordWithoutId: Omit<Record, "id">): Promise<Record>;
  updateRecord(record: Record): Promise<Record>;
  deleteRecord(id: string): Promise<void>;
};
