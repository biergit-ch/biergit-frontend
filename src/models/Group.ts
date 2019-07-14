import { Expense } from "./Expense";
import { User } from "./User";

export interface Group {
    id: string;
    name: string;
    members: User[];
    expenses: Expense[];
}