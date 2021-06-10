import { paths } from "generated/openapi/schema";
import { RecordRepogitory } from "~/gateway/RecordRepogitory";
import { createRecord } from "~/usecase/createRecord";
import { deleteRecord } from "~/usecase/deleteRecord";
import { getRecord } from "~/usecase/getRecord";
import { updateRecord } from "~/usecase/updateRecord";
import { PartialServerImplementation } from "./mapper";

type RecordHandler = PartialServerImplementation<
  paths,
  "/record" | "/record/{id}"
>;

const handler: RecordHandler = {
  "/record": {
    get: async ({ userId }) => {
      return {
        status: 200,
        body: await getRecord(new RecordRepogitory(), userId),
      };
    },
    post: async ({ body, userId }) => {
      return {
        status: 200,
        body: await createRecord(new RecordRepogitory(), { ...body, userId }),
      };
    },
  },
  "/record/{id}": {
    put: async ({ params, body, userId }) => {
      return {
        status: 200,
        body: await updateRecord(new RecordRepogitory(), {
          id: params.id,
          userId,
          ...body,
        }),
      };
    },
    delete: async ({ params }) => {
      await deleteRecord(new RecordRepogitory(), params.id);
      return {
        status: 204,
      };
    },
  },
};

export default handler;
