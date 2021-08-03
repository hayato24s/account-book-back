import { RecordType } from "./record";

export type Category = {
  id: string;
  userId: string;
  type: RecordType;
  name: string;
  color: string;
};
