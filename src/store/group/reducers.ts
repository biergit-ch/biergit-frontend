import {
    GroupState,
    ADD_GROUP,
    EDIT_GROUP,
    DELETE_GROUP,
    GroupActionTypes
} from "./types";

import mockData from './../../mock-data.json';

const initialState: GroupState = {
    groups: mockData.groups
};

export function groupReducer(
    state = initialState,
    action: GroupActionTypes
): GroupState {
    switch (action.type) {
        case ADD_GROUP:
            return {
                groups: [...state.groups, action.payload]
            };
        case EDIT_GROUP:
            var index = state.groups.findIndex(group => group.id === action.payload.id);

            if (index !== -1) {
                state.groups[index] = action.payload;
            }
            return {
                groups: [...state.groups]
            };
        case DELETE_GROUP:
            return {
                groups: state.groups.filter(
                    group => group.id !== action.payload.id
                )
            }
        default:
            return state;
    }
}
