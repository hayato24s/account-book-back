import { Record } from "../entity/record";
import { IRecordRepogitory } from "../interface/IRecordRepogitory";

/**
 * 記録を作成する。
 * @param repo Record Repogitory
 * @param recordWithoutId 入力データ
 */
export async function createRecord(
  repo: IRecordRepogitory,
  recordWithoutId: Omit<Record, "id">
): Promise<Record> {
  return repo.createRecord(recordWithoutId);
}
