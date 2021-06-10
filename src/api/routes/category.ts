import { PartialServerImplementation } from "./mapper";
import { CategoryRepogitory } from "~/gateway/CategoryRepogitory";
import { createCategory } from "~/usecase/createCategory";
import { deleteCategory } from "~/usecase/deleteCategory";
import { getCategory } from "~/usecase/getCategory";
import { updateCategory } from "~/usecase/updateCategory";
import { paths } from "generated/openapi/schema";

type CategoryHandler = PartialServerImplementation<
  paths,
  "/category" | "/category/{id}"
>;

const handler: CategoryHandler = {
  "/category": {
    get: async ({ userId }) => {
      return {
        status: 200,
        body: await getCategory(new CategoryRepogitory(), userId),
      };
    },
    post: async ({ body, userId }) => {
      return {
        status: 200,
        body: await createCategory(new CategoryRepogitory(), {
          ...body,
          userId,
        }),
      };
    },
  },
  "/category/{id}": {
    put: async ({ params, body, userId }) => {
      return {
        status: 200,
        body: await updateCategory(new CategoryRepogitory(), {
          id: params.id,
          userId,
          ...body,
        }),
      };
    },
    delete: async ({ params }) => {
      await deleteCategory(new CategoryRepogitory(), params.id);
      return {
        status: 204,
      };
    },
  },
};

export default handler;
