import { getRepository, Repository } from "typeorm";
import { BadRequestError, NotFoundError, UnauthorizedError } from "~/error";
import { UserModel } from "../database/model/user";
import { User } from "../entity/user";
import { IUserRepogitory } from "../interface/IUserRepogitory";
import { checkObjectHasProperty } from "./utils";

export class UserRepogitory implements IUserRepogitory {
  private repo: Repository<UserModel>;

  constructor() {
    this.repo = getRepository(UserModel);
  }

  async getUser(id: string) {
    const user = await this.repo.findOne(id);
    if (user == undefined) {
      throw new NotFoundError("idに該当するユーザーが見つかりませんでした");
    }
    return user;
  }

  async createUser(user: User) {
    if (!checkObjectHasProperty<User>(user, ["id", "password"]))
      throw new BadRequestError("ユーザーの入力データが正しくありません");
    const existedUser = await this.repo.findOne(user.id);
    if (existedUser != undefined)
      throw new BadRequestError("そのユーザーIDはすでに使われています");
    return this.repo.save(this.repo.create(user));
  }

  async authenticateUser(user: User) {
    if (!checkObjectHasProperty<User>(user, ["id", "password"]))
      throw new BadRequestError("ユーザーの入力データが正しくありません");
    const authenticatedUser = await this.repo.findOne(user);
    if (authenticatedUser == undefined)
      throw new UnauthorizedError("ユーザーIDまたはパスワードが違います");
    return authenticatedUser.id;
  }

  async checkIdUnique(id: string) {
    const existedUser = await this.repo.findOne(id);
    return existedUser == undefined;
  }
}
