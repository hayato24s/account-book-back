import { Dayjs } from "dayjs";
import { getRepository, MoreThan, Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { UnauthorizedError } from "~/error";
import { SessionModel } from "../database/model/session";
import { ISessionRepogitory } from "../interface/ISessionRepogitory";

export class SessionRepogitory implements ISessionRepogitory {
  private repo: Repository<SessionModel>;

  constructor() {
    this.repo = getRepository(SessionModel);
  }

  async createSession(userId: string, expiredAt: Dayjs) {
    return this.repo
      .save(this.repo.create({ id: uuid(), userId, expiredAt: expiredAt.toDate() }))
      .then((res) => res.id);
  }

  async checkSession(id: string) {
    const session = await this.repo.findOne({
      where: {
        id,
        expiredAt: MoreThan(new Date()),
      },
    });
    if (session == undefined)
      throw new UnauthorizedError("セッションが有効ではありません");
    return session.userId;
  }
}
