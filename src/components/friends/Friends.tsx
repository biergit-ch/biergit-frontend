import React, { useState, useEffect, useContext } from 'react';
import { List, Divider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { NewGroup } from '../group/creation/NewGroup';
import { useBiergitApiClient } from '../../api/useBiergitApiClient';
import { User } from '../../models/User';
import { UserItem } from '../user/UserItem';
import { UserContext } from '../../providers/UserContextProvider';
import history from '../../history';
import { Expense, ExpenseDTO } from '../../models/Expense';
import { Context, ContextDTO } from '../../models/Context';
import theme from '../../theme';
import { TitlebarContext } from '../../providers/TitlebarContextProvider';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      flexGrow: 1,
      textAlign: 'center',
    },
  }),
);
export const Friends: React.FC = () => {
  const { getUsers, addExpense } = useBiergitApiClient();
  const { currentUser } = useContext(UserContext);
  const { setTitle, setHasHamburgerMenu, setHasBack } = useContext(
    TitlebarContext,
  );
  const [friends, setFriends] = useState<User[]>();
  const classes = useStyles(theme);
  const { t } = useTranslation();

  setTitle(t('common_friends'));
  setHasBack(false);
  setHasHamburgerMenu(true);

  useEffect(() => {
    const getFriends = async (): Promise<void> => {
      let users = await getUsers();
      users = users?.filter(u => u.id !== currentUser?.id);
      setFriends(users);
    };
    getFriends();
  }, [getUsers, currentUser]);

  const spendBeer = async (user: User): Promise<void> => {
    if (user.id && currentUser) {
      const expense: Expense = new Expense({
        userFrom: currentUser.id,
        userTo: user.id,
        amount: 1,
        context: new Context({
          type: 'direct',
          reference: '',
        } as ContextDTO),
      } as ExpenseDTO);
      await addExpense(expense);
      history.push('/');
    }
  };

  return (
    <div className={classes.root}>
      <List>
        <NewGroup />
        <Divider variant="inset" component="li" />
        {friends &&
          friends.map(friend => (
            <UserItem
              key={friend.id}
              user={friend}
              handleClick={(user: User): Promise<void> => spendBeer(user)}
            />
          ))}
      </List>
    </div>
  );
};
