export type ISessionRepogitory = {
  createSession(userId: string, expiredAt: Date): Promise<string>;
  checkSession(id: string): Promise<string>;
};
