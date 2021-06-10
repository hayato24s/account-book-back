import { IUserRepogitory } from "~/interface/IUserRepogitory";

/**
 * ユーザー情報を取得する。
 * @param repo User Repogitory
 * @param id id
 */
export async function getUser(repo: IUserRepogitory, id: string) {
  return repo.getUser(id);
}
