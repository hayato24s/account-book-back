import { User } from "~/entity/user";
import { IUserRepogitory } from "~/interface/IUserRepogitory";

/**
 * ユーザIDとパスワードを確認して認証を行う。
 * 成功した場合は、ユーザーIDを返す。
 * @param repo User Repogitory
 * @param user ユーザーIDとパスワード
 */
export async function authenticateUser(
  repo: IUserRepogitory,
  user: User
): Promise<string> {
  return repo.authenticateUser(user);
}
