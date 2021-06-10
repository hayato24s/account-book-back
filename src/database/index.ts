import { createConnection, getConnection } from "typeorm";
import { logger } from "~/logger";
import { CategoryModel } from "./model/category";
import { RecordModel } from "./model/record";
import { SessionModel } from "./model/session";
import { UserModel } from "./model/user";

export async function connectDatabase() {
  const config = {
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "mysql",
    database: "account_book",
  };

  const connection = await createConnection({
    type: "mysql",
    ...config,
    entities: [UserModel, CategoryModel, RecordModel, SessionModel],
    synchronize: true,
  });

  logger.info("connected to mysql.");
  return connection;
}

export async function disconnectDatabase() {
  return await getConnection().close();
}
