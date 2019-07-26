import {
    UserState,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    UserActionTypes,
    SET_CURRENTUSER
} from "./types";

import mockData from './../../mock-data.json';

const initialState: UserState = {
    users: mockData.users,
    currentUser: mockData.users[0],
};

export function userReducer(
    state = initialState,
    action: UserActionTypes
): UserState {
    switch (action.type) {
        case ADD_USER:
            return {
                users: [...state.users, action.payload],
                currentUser: state.currentUser
            };
        case SET_CURRENTUSER: {
            return {
                users: [...state.users],
                currentUser: action.payload
            }
        }
        case EDIT_USER:
            var index = state.users.findIndex(user => user.user_id === action.payload.user_id);

            if (index !== -1) {
                state.users[index] = action.payload;
            }
            return {
                users: [...state.users],
                currentUser: state.currentUser
            };
        case DELETE_USER:
            return {
                users: state.users.filter(
                    user => user.user_id !== action.payload.user_id
                ),
                currentUser: state.currentUser
            }
        default:
            return state;
    }
}
