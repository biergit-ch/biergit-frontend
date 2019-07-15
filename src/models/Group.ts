import { Expense } from "./Expense";
import { User } from "./User";

export interface Group {
    id: string;
    name: string;
    picture: string;
    members: string[];
    expenses?: Expense[] | string[];
}