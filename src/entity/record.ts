import { Category } from "./category";

export type RecordType = "Expense" | "Income";

export type Record = {
  id: string;
  userId: string;
  type: RecordType;
  amount: number;
  category: Category;
  memo: string;
  date: string;
};
