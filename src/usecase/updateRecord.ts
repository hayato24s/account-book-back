import { Record } from "../entity/record";
import { IRecordRepogitory } from "../interface/IRecordRepogitory";

/**
 * 記録を更新する。
 * @param repo Record Repogitory
 * @param record 入力データ
 */
export async function updateRecord(repo: IRecordRepogitory, record: Record) {
  return repo.updateRecord(record);
}
