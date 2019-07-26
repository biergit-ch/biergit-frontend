import { ADD_EXPENSE } from "./types";
import { ExpenseModel } from "../../models";

export function addExpense(newExpense: ExpenseModel) {
  return {
    type: ADD_EXPENSE,
    payload: newExpense
  };
}
