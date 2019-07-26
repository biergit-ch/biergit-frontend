import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { groupReducer } from "./group/reducers";
import { userReducer } from "./user/reducers";
import { expenseReducer } from "./expense/reducers";

const rootReducer = combineReducers({
    group: groupReducer,
    user: userReducer,
    expense: expenseReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
