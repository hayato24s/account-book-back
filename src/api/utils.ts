export const cookieName = "account-book_session";

export type CookieType = {
  name: string;
  value: string;
  options: Record<string, any>;
};

export function applySessionCookie(value: string, expires: Date): CookieType {
  return {
    name: cookieName,
    value,
    options: {
      expires,
      httpOnly: true,
    },
  };
}
