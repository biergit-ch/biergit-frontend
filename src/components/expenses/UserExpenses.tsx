import React, { useEffect, useContext, useState } from 'react';
import { useAuth0 } from '../../auth/auth0-spa';
import { UserContext } from '../../providers/UserContextProvider';
import { useBiergitApiClient } from '../../api/useBiergitApiClient';
import history from '../../history';
import { Expense, ExpenseDTO } from '../../models/Expense';
import { ExpensePair } from '../../models/ExpensePair';
import { ReactComponent as Beer } from '../../common/assets/beer.svg';
import { ReactComponent as BeerEmpty } from '../../common/assets/beer_empty.svg';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
} from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import { Loading } from '../../common/components/Loading';
import { Intro } from '../intro/Intro';
import { TitlebarContext } from '../../providers/TitlebarContextProvider';
import { useTranslation } from 'react-i18next';
import { CallToAction } from '../cta/CallToAction';
import theme from '../../theme';

const useStyles = makeStyles(
  createStyles({
    actionIcon: {
      width: 20,
      height: 20,
    },
    redText: {
      color: red.A700,
    },
    greenText: {
      color: green.A700,
    },
    beerLogo: {
      height: 25,
    },
    beerEmptyLogo: {
      height: 25,
    },
  }),
);
export const UserExpenses: React.FC = () => {
  const { loading } = useAuth0();
  const { getExpenses, addExpense } = useBiergitApiClient();
  const { currentUser } = useContext(UserContext);
  const { setTitle } = useContext(TitlebarContext);
  const { t } = useTranslation();
  const [expenseOverview, setExpenseOverview] = useState<ExpensePair[]>();
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const classes = useStyles(theme);

  setTitle(t('common_home'));

  useEffect(() => {
    const initExpenses = async (): Promise<void> => {
      const expenses = await getExpenses();
      setExpenseOverview(expenses);
    };
    if (!loading) {
      initExpenses();
    }
  }, [loading, getExpenses]);

  const toggleCheckedUser = (userId?: string): void => {
    if (userId) {
      const currentIndex = checkedUsers.indexOf(userId);
      const newChecked = [...checkedUsers];

      if (currentIndex === -1) {
        newChecked.push(userId);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setCheckedUsers(newChecked);
    }
  };

  const spendBeers = async (): Promise<void> => {
    if (checkedUsers?.length > 0) {
      if (!currentUser) {
        return;
      }
      for (const userId of checkedUsers) {
        const expense: Expense = new Expense({
          userFrom: currentUser.id,
          userTo: userId,
        } as ExpenseDTO);
        await addExpense(expense);
      }
      setCheckedUsers([]);
      const expenses = await getExpenses();
      setExpenseOverview(expenses);
    } else {
      history.push('/group/create');
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : expenseOverview && expenseOverview?.length > 0 ? (
        <div>
          <IconButton onClick={(): void => history.push('/user/history')}>
            <HistoryIcon />
          </IconButton>
          <Typography component="h5" variant="h5" gutterBottom>
            Übersicht
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Schulden</TableCell>
                <TableCell>Aktion</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {expenseOverview &&
                expenseOverview.map((expense: ExpensePair) => {
                  return (
                    <TableRow key={expense.id}>
                      <TableCell component="th" scope="row">
                        <Avatar
                          src={expense.attendeeTwo?.pictureUrl}
                          alt="User Avatar"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>{expense.attendeeTwo?.fullName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {expense.userFromDiff < 0 ? (
                            <Typography className={classes.redText}>
                              {expense.userFromDiff}
                            </Typography>
                          ) : (
                            <Typography className={classes.greenText}>
                              +{expense.userFromDiff}
                            </Typography>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell
                        onClick={(): void => {
                          toggleCheckedUser(expense.attendeeTwo?.id);
                        }}
                      >
                        {checkedUsers.some(
                          uId => uId === expense.attendeeTwo?.id,
                        ) === true ? (
                          <Beer className={classes.beerLogo} />
                        ) : (
                          <BeerEmpty className={classes.beerEmptyLogo} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <br />
          <CallToAction
            icon="add"
            tooltip={t('group_creategroup')}
            action={(): Promise<void> => spendBeers()}
          />
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};
