import { getRepository, Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { BadRequestError, NotFoundError } from "~/error";
import { CategoryModel } from "../database/model/category";
import { Category } from "../entity/category";
import { ICategoryRepogitory } from "../interface/ICategoryRepogitory";
import { checkObjectHasProperty } from "./utils";

export class CategoryRepogitory implements ICategoryRepogitory {
  private repo: Repository<CategoryModel>;

  constructor() {
    this.repo = getRepository(CategoryModel);
  }

  async getCategory(userId: string) {
    return this.repo.find({
      where: { userId },
    });
  }

  async createCategory(c: Omit<Category, "id">) {
    if (
      !checkObjectHasProperty<Omit<Category, "id">>(c, [
        "userId",
        "name",
        "color",
      ])
    )
      throw new BadRequestError("カテゴリーの入力データが正しくありません");
    return this.repo.save(this.repo.create({ ...c, id: uuid() }));
  }

  async updateCategory(c: Category) {
    if (!checkObjectHasProperty<Category>(c, ["id", "userId", "name", "color"]))
      throw new BadRequestError("カテゴリーの入力データが正しくありません");
    const category = await this.repo.findOne(c.id);
    if (category == undefined)
      throw new NotFoundError("idに該当するカテゴリーが見つかりません");
    return this.repo.save(c);
  }

  async deleteCategory(id: string) {
    const category = await this.repo.findOne(id);
    if (category == undefined)
      throw new NotFoundError("idに該当するカテゴリーが見つかりません");
    this.repo.remove(category);
  }
}
