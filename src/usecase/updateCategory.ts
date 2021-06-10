import { Category } from "../entity/category";
import { ICategoryRepogitory } from "../interface/ICategoryRepogitory";

/**
 * カテゴリーを更新する。
 * @param repo Category Repogitory
 * @param category 入力データ
 */
export async function updateCategory(
  repo: ICategoryRepogitory,
  category: Category
): Promise<Category> {
  return repo.updateCategory(category);
}
