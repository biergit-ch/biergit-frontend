import { ExpenseModel } from "../../models";

export interface ExpenseState {
    expenses: ExpenseModel[];
}

export const ADD_EXPENSE = "ADD_EXPENSE";

interface AddExpenseAction {
    type: typeof ADD_EXPENSE;
    payload: ExpenseModel;
}

export type ExpenseActionTypes = AddExpenseAction;
