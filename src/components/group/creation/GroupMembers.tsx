import React, { useState, useEffect, useContext } from 'react';
import { User } from '../../../models/User';
import { useBiergitApiClient } from '../../../api/useBiergitApiClient';
import { UserContext } from '../../../providers/UserContextProvider';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CallToAction } from '../../cta/CallToAction';
import history from '../../../history';
import { SelectedUsers } from '../../user/SelectedUsers';
import { GroupCreationContext } from '../../../providers/GroupCreationContextProvider';
import { TitlebarContext } from '../../../providers/TitlebarContextProvider';
import { useTranslation } from 'react-i18next';
import { UserList } from '../../user/UserList';
import theme from '../../../theme';

const useStyles = makeStyles(
  createStyles({
    root: {
      width: '100%',
      flexGrow: 1,
      textAlign: 'center',
    },
  }),
);

export const GroupMembers: React.FC = () => {
  const classes = useStyles(theme);
  const { getUsers } = useBiergitApiClient();
  const { selectedUsers, toggleSelectedUser } = useContext(
    GroupCreationContext,
  );
  const { t } = useTranslation();
  const { setTitle } = useContext(TitlebarContext);
  const { currentUser } = useContext(UserContext);
  const [groupMembers, setGroupMembers] = useState<User[]>();

  setTitle(t('groupmembers_header'));

  useEffect(() => {
    const getFriends = async (): Promise<void> => {
      let users = await getUsers();
      users = users?.filter(u => u.id !== currentUser?.id);
      setGroupMembers(users);
    };
    getFriends();
  }, [getUsers, currentUser]);

  const moveToDetailsPage = (): void => {
    history.push('/group/details');
  };

  return (
    <>
      <div className={classes.root}>
        <SelectedUsers
          selectedUsers={selectedUsers}
          removeSelectedUser={(user: User): void => toggleSelectedUser(user)}
        />
        {groupMembers && (
          <UserList
            users={groupMembers}
            handleUserClick={(user: User): void => toggleSelectedUser(user)}
          />
        )}
        <CallToAction
          icon="arrow_forward"
          tooltip="Enter Group Details"
          action={(): void => moveToDetailsPage()}
        />
      </div>
    </>
  );
};
