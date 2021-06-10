import { Category } from "../entity/category";
import { ICategoryRepogitory } from "../interface/ICategoryRepogitory";

/**
 * ユーザーIDに該当するカテゴリーを取得する。
 * @param repo Category Repogitory
 * @param userId ユーザーID
 */
export async function getCategory(
  repo: ICategoryRepogitory,
  userId: string
): Promise<Category[]> {
  return repo.getCategory(userId);
}
