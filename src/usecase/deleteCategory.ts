import { ICategoryRepogitory } from "../interface/ICategoryRepogitory";

/**
 * カテゴリーを削除する。
 * @param repo Category Repogitory
 * @param id id
 */
export async function deleteCategory(
  repo: ICategoryRepogitory,
  id: string
): Promise<void> {
  return repo.deleteCategory(id);
}
