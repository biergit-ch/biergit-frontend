import { Expense } from "./Expense";
import { Group } from "./Group";

export interface User {
    user_id: string;
    name: string;
    nickname: string;
    username: string;
    email: string;
    picture: any;
    identities: [];
    expenses: Expense[];
    groups: Group[];
}
