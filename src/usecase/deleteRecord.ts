import { IRecordRepogitory } from "../interface/IRecordRepogitory";

/**
 * 記録を削除する。
 * @param repo Record Repogitory
 * @param id id
 */
export async function deleteRecord(
  repo: IRecordRepogitory,
  id: string
): Promise<void> {
  return repo.deleteRecord(id);
}
