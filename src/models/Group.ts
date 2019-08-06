import { Expense } from "./Expense";

export interface Group {
    id: string;
    name: string;
    picture: string;
    members: string[];
    expenses?: Expense[] | string[];
}