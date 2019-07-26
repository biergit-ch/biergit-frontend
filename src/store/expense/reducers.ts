import {
    ExpenseState,
    ADD_EXPENSE,
    ExpenseActionTypes
} from "./types";

import mockData from './../../mock-data.json';

const initialState: ExpenseState = {
    expenses: mockData.expenses
};

export function expenseReducer(
    state = initialState,
    action: ExpenseActionTypes
): ExpenseState {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                expenses: [...state.expenses, action.payload]
            };
        default:
            return state;
    }
}
