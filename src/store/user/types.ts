import { UserModel } from "../../models";

export interface UserState {
    users: UserModel[];
    currentUser: UserModel;
}

export const ADD_USER = "ADD_USER";
export const SET_CURRENTUSER = "SET_CURRENTUSER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

interface AddUserAction {
    type: typeof ADD_USER;
    payload: UserModel;
}

interface SetCurrentUserAction {
    type: typeof SET_CURRENTUSER;
    payload: UserModel;
}

interface EditUserAction {
    type: typeof EDIT_USER;
    payload: UserModel
}

interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: UserModel
}

export type UserActionTypes = AddUserAction | SetCurrentUserAction | EditUserAction | DeleteUserAction;
