import { ISessionRepogitory } from "../interface/ISessionRepogitory";

const sessionName = "account-book_session";
const sessionLifeTimeHours = 1;
const expiredAt = new Date(); // セッションの有効期限
expiredAt.setHours(expiredAt.getHours() + sessionLifeTimeHours);

/**
 * ユーザーIDをもとにセッションを発行する。
 * @param repo Session Repogitory
 * @param userId ユーザーID
 */
export async function createSession(repo: ISessionRepogitory, userId: string) {
  const session = await repo.createSession(userId, expiredAt);
  return {
    session,
    expiredAt,
  };
}
