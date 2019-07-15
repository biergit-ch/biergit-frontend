import { GroupModel } from "../../models";

export interface GroupState {
    groups: GroupModel[];
}

export const ADD_GROUP = "ADD_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";

interface AddGroupAction {
    type: typeof ADD_GROUP;
    payload: GroupModel;
}

interface EditGroupAction {
    type: typeof EDIT_GROUP;
    payload: GroupModel
}

interface DeleteGroupAction {
    type: typeof DELETE_GROUP;
    payload: GroupModel
}

export type GroupActionTypes = AddGroupAction | EditGroupAction | DeleteGroupAction;
