import { Category } from "../entity/category";

export type ICategoryRepogitory = {
  getCategory(userId: string): Promise<Category[]>;
  createCategory(categoryWithoutId: Omit<Category, "id">): Promise<Category>;
  updateCategory(category: Category): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
};
