import { paths } from "generated/openapi/schema";
import { SessionRepogitory } from "~/gateway/SessionRepogitory";
import { UserRepogitory } from "~/gateway/UserRepogitory";
import { authenticateUser } from "~/usecase/authenticateUser";
import { createSession } from "~/usecase/createSession";
import { applySessionCookie } from "../utils";
import { PartialServerImplementation } from "./mapper";

type AuthHandler = PartialServerImplementation<
  paths,
  "/auth/login" | "/auth/logout"
>;

const handler: AuthHandler = {
  "/auth/login": {
    post: async ({ body }) => {
      const userId = await authenticateUser(new UserRepogitory(), body);
      const { session, expiredAt } = await createSession(
        new SessionRepogitory(),
        userId
      );
      return {
        status: 204,
        cookie: applySessionCookie(session, expiredAt.toDate()),
      };
    },
  },
  "/auth/logout": {
    get: async () => {
      return {
        status: 204,
        cookie: applySessionCookie("", new Date(1)),
      };
    },
  },
};

export default handler;
