import { ADD_GROUP, EDIT_GROUP, DELETE_GROUP } from "./types";
import { GroupModel } from "../../models";

export function addGroup(newGroup: GroupModel) {
  return {
    type: ADD_GROUP,
    payload: newGroup
  };
}

export function editGroup(groupToEdit: GroupModel) {
    return {
      type: EDIT_GROUP,
      payload: groupToEdit
    };
  }

export function deleteGroup(gropuToDelete: GroupModel) {
  return {
    type: DELETE_GROUP,
      payload: gropuToDelete
  };
}
