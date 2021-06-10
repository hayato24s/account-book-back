import { User } from "~/entity/user";
import { IUserRepogitory } from "~/interface/IUserRepogitory";

/**
 * ユーザーを作成する。
 * @param repo User Repogitory
 * @param user 入力データ
 */
export async function createUser(
  repo: IUserRepogitory,
  user: User
): Promise<User> {
  return repo.createUser(user);
}
