import React from 'react';
import { ListItem } from '@material-ui/core';
import { Group } from '../../models/Group';

interface GroupListItemProps {
  group: Group;
  onClick: (group: Group) => void;
}

export const GroupListItem: React.FC<GroupListItemProps> = (
  props: GroupListItemProps,
) => {
  const handleClick = (): void => {
    props.onClick(props.group);
  };

  return (
    <ListItem onClick={(): void => handleClick()}>
      {props.group?.groupName}
    </ListItem>
  );
};
