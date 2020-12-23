import React from 'react';
import { User } from '../../models/User';
import { SelectedUser } from './SelectedUser';
import { List } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectedUserContainer: {
      background: '#eeeeee',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0.5),
      textAlign: 'center',
    },
    selectedUserList: {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
);

interface SelectedUsersProps {
  selectedUsers?: User[];
  removeSelectedUser: (user: User) => void;
}

export const SelectedUsers: React.FC<SelectedUsersProps> = (
  props: SelectedUsersProps,
) => {
  const classes = useStyles(theme);
  return props.selectedUsers && props.selectedUsers.length > 0 ? (
    <div className={classes.selectedUserContainer}>
      <List className={classes.selectedUserList}>
        {props.selectedUsers &&
          props.selectedUsers.map(selectedUser => (
            <SelectedUser
              key={selectedUser.id}
              selectedUser={selectedUser}
              handleBadgeClick={(user: User): void =>
                props.removeSelectedUser(user)
              }
            />
          ))}
      </List>
    </div>
  ) : (
    <div></div>
  );
};
