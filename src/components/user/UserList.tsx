import React from 'react';
import { User } from '../../models/User';
import { List } from '@material-ui/core';
import { UserItem } from './UserItem';

interface UserListProps {
  users: User[];
  handleUserClick?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = (props: UserListProps) => {
  return (
    <List>
      {props.users &&
        props.users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            handleClick={
              props.handleUserClick ? props.handleUserClick : undefined
            }
          />
        ))}
    </List>
  );
};
