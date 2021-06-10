import { Express } from "express";
import { mapToExpress } from "./mapper";
import auth from "./auth";
import category from "./category";
import record from "./record";
import user from "./user";

export function applayRouter(app: Express) {
  const impl = {
    ...category,
    ...record,
    ...user,
    ...auth,
  };
  mapToExpress(app, impl);
}
