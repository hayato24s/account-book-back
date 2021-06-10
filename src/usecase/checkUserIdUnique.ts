import { IUserRepogitory } from "~/interface/IUserRepogitory";

/**
 * ユーザーIDがユニークかチェックする。
 * @param repo User Repogitory
 * @param id 検証したいユーザID
 */
export async function checkUserIdUnique(
  repo: IUserRepogitory,
  id: string
): Promise<boolean> {
  return repo.checkIdUnique(id);
}
