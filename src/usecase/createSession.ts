import dayjs from "dayjs";
import { ISessionRepogitory } from "../interface/ISessionRepogitory";

const sessionName = "account-book_session";
const sessionLifeTimeHours = 1;

/**
 * ユーザーIDをもとにセッションを発行する。
 * @param repo Session Repogitory
 * @param userId ユーザーID
 */
export async function createSession(repo: ISessionRepogitory, userId: string) {
  const expiredAt = dayjs().add(sessionLifeTimeHours, 'hour');
  const session = await repo.createSession(userId, expiredAt);
  return {
    session,
    expiredAt,
  };
}
