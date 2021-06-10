import { User } from "../entity/user";

export type IUserRepogitory = {
  getUser(id: string): Promise<User>;
  createUser(user: User): Promise<User>;
  authenticateUser(user: User): Promise<string>;
  checkIdUnique(id: string): Promise<boolean>;
};
