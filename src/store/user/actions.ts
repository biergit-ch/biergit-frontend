import { ADD_USER, EDIT_USER, DELETE_USER, SET_CURRENTUSER } from "./types";
import { UserModel } from "../../models";

export function addUser(newUser: UserModel) {
  return {
    type: ADD_USER,
    payload: newUser
  };
}

export function setCurrentUser(user: UserModel) {
  return {
    type: SET_CURRENTUSER,
    payload: user
  }
}

export function editUser(userToEdit: UserModel) {
  return {
    type: EDIT_USER,
    payload: userToEdit
  };
}

export function deleteUser(gropuToDelete: UserModel) {
  return {
    type: DELETE_USER,
    payload: gropuToDelete
  };
}
