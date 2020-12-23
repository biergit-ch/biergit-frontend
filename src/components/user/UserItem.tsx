import React from 'react';
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { User } from '../../models/User';

interface UserItemProps {
  user: User;
  handleClick?: (user: User) => void;
  hideDivider?: boolean;
}

export const UserItem: React.FC<UserItemProps> = (props: UserItemProps) => {
  const handleClick = (): void => {
    if (props.handleClick) {
      props?.handleClick(props.user);
    }
  };

  return (
    <>
      <ListItem onClick={(): void => handleClick()}>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${props.user.id}`}
            src={props.user.pictureUrl}
          />
        </ListItemAvatar>
        <ListItemText>{props.user.fullName ?? 'Default'}</ListItemText>
      </ListItem>
      {!props.hideDivider && <Divider variant="inset" component="li" />}
    </>
  );
};
