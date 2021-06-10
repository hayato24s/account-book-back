import { IRecordRepogitory } from "../interface/IRecordRepogitory";

/**
 * ユーザーIDに該当する記録を取得する。
 * @param repo
 * @param userId
 */
export async function getRecord(repo: IRecordRepogitory, userId: string) {
  return repo.getRecord(userId);
}
