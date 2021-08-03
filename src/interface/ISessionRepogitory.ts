import { Dayjs } from "dayjs";

export type ISessionRepogitory = {
  createSession(userId: string, expiredAt: Dayjs): Promise<string>;
  checkSession(id: string): Promise<string>;
};
