import { Category } from "../entity/category";
import { ICategoryRepogitory } from "../interface/ICategoryRepogitory";

/**
 * カテゴリーを作成する。
 * @param repo Category Repogitory
 * @param categoryWithoutId 入力データ
 */
export async function createCategory(
  repo: ICategoryRepogitory,
  categoryWithoutId: Omit<Category, "id">
): Promise<Category> {
  return repo.createCategory(categoryWithoutId);
}
