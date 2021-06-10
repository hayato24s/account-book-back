import { ISessionRepogitory } from "../interface/ISessionRepogitory";

/**
 * セッションを検証し、有効ならばユーザーIDを返す。
 * @param repo session repogitory
 * @param id セッションID
 */
export async function checkSession(
  repo: ISessionRepogitory,
  id: string
): Promise<string> {
  return repo.checkSession(id);
}
