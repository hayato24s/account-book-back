import { paths } from "generated/openapi/schema";
import { SessionRepogitory } from "~/gateway/SessionRepogitory";
import { UserRepogitory } from "~/gateway/UserRepogitory";
import { checkUserIdUnique } from "~/usecase/checkUserIdUnique";
import { createSession } from "~/usecase/createSession";
import { createUser } from "~/usecase/createUser";
import { getUser } from "~/usecase/getUser";
import { applySessionCookie } from "../utils";
import { PartialServerImplementation } from "./mapper";

const cookieName = "account-book_session";

type Userhandler = PartialServerImplementation<
  paths,
  "/user/create" | "/user/me" | "/user/unique"
>;

const handler: Userhandler = {
  "/user/create": {
    post: async ({ body }) => {
      const user = await createUser(new UserRepogitory(), body);
      const { session, expiredAt } = await createSession(
        new SessionRepogitory(),
        user.id
      );
      return {
        status: 204,
        cookie: applySessionCookie(session, expiredAt),
      };
    },
  },
  "/user/me": {
    get: async ({ userId }) => {
      const user = await getUser(new UserRepogitory(), userId);
      return { status: 200, body: user };
    },
  },
  "/user/unique": {
    get: async ({ query }) => {
      const unique = await checkUserIdUnique(new UserRepogitory(), query.id);
      return { status: 200, body: { unique } };
    },
  },
};

export default handler;
