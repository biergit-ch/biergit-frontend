import React, { useContext, useEffect, useState, useCallback } from 'react';

import { useBiergitApiClient } from '../../api/useBiergitApiClient';
import { TitlebarContext } from '../../providers/TitlebarContextProvider';
import { useAuth0 } from '../../auth/auth0-spa';

import { useTranslation } from 'react-i18next';
import { Loading } from '../../common/components/Loading';
import { ExpensePair } from '../../models/ExpensePair';
import { ExpenseItem } from './ExpenseItem';
import { List } from '@material-ui/core';
import { Intro } from '../intro/Intro';
import { CallToAction } from '../cta/CallToAction';
import history from '../../history';
import { User } from '../../models/User';
import { UserContext } from '../../providers/UserContextProvider';
import { Expense, ExpenseDTO } from '../../models/Expense';
import { Group } from '../../models/Group';
import { ContextDTO, Context } from '../../models/Context';

interface ExpenseSummaryProps {
  expensePairs?: ExpensePair[];
  context?: string;
  loadGroupExpenses?: (groupId: string) => Promise<void>;
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = (
  props: ExpenseSummaryProps,
) => {
  const { loading } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const { getMyDirectExpenses, addExpense, getGroups } = useBiergitApiClient();
  const {
    setTitle,
    setHasSearch,
    setHasMoreOptions,
    setHasBack,
    setHasHamburgerMenu,
  } = useContext(TitlebarContext);
  const [expenseOverview, setExpenseOverview] = useState<
    (ExpensePair | Group)[]
  >();
  const [loadingExpenses, setLoadingExpense] = useState(false);
  const { t } = useTranslation();

  if (!props.context) {
    setTitle(t('common_home'));
    setHasSearch(false);
    setHasBack(false);
    setHasHamburgerMenu(true);
    setHasMoreOptions(false);
  }

  const loadExpenseSummary = useCallback(async (): Promise<
    (ExpensePair | Group)[]
  > => {
    let expenses = [] as ExpensePair[];
    let groups = [] as Group[];
    let expenseSummary = [] as (ExpensePair | Group)[];
    if (props.expensePairs && props.expensePairs.length > 0) {
      expenses = props.expensePairs;
      expenseSummary = [...expenses];
    } else {
      expenses = await getMyDirectExpenses();
      groups = await getGroups();
      expenseSummary = [...expenses, ...groups];
    }
    return expenseSummary;
  }, [getMyDirectExpenses, getGroups, props.expensePairs]);

  useEffect(() => {
    const initExpenses = async (): Promise<void> => {
      setLoadingExpense(true);
      const expenseSummary = await loadExpenseSummary();
      setExpenseOverview(expenseSummary);
      setLoadingExpense(false);
    };
    if (!loading) {
      initExpenses();
    }
  }, [loading, loadExpenseSummary, props.expensePairs]);

  const spendBeer = async (param: User | Group | undefined): Promise<void> => {
    if (param !== undefined && currentUser !== undefined) {
      if (param instanceof User) {
        const expense: Expense = new Expense({
          userFrom: currentUser.id,
          userTo: param.id,
          amount: 1,
          context: new Context({
            type: props.context ? 'group' : 'direct',
            reference: props.context,
          }),
        } as ExpenseDTO);
        await addExpense(expense);
      } else if (param instanceof Group) {
        for (const member of param.members.filter(
          u => u.id !== currentUser?.id,
        )) {
          const expense: Expense = new Expense({
            userFrom: currentUser.id,
            userTo: member.id,
            amount: 1,
            context: new Context({
              type: 'group',
              reference: param.id,
            } as ContextDTO),
          } as ExpenseDTO);
          await addExpense(expense);
        }
      }
      if (props.context && props.loadGroupExpenses) {
        await props.loadGroupExpenses(props.context);
        return;
      }
      const expenseSummary = await loadExpenseSummary();
      setExpenseOverview(expenseSummary);
    }
  };

  return (
    <div>
      {loading || loadingExpenses ? (
        <Loading />
      ) : expenseOverview && expenseOverview?.length > 0 ? (
        <>
          <List>
            {expenseOverview.map(expenseItem =>
              expenseItem instanceof ExpensePair ? (
                <ExpenseItem
                  key={expenseItem.id}
                  type="user"
                  title={expenseItem.attendeeTwo?.fullName}
                  owe={expenseItem.userFromDiff}
                  lastActivity={expenseItem.lastTransactionDate}
                  avatar={expenseItem.attendeeTwo?.pictureUrl}
                  user={expenseItem.attendeeTwo}
                  addExpense={(
                    param: User | Group | undefined,
                  ): Promise<void> => spendBeer(param)}
                />
              ) : expenseItem instanceof Group ? (
                <ExpenseItem
                  key={expenseItem.id}
                  type="group"
                  title={expenseItem.groupName}
                  owe={expenseItem.userFromDiff}
                  lastActivity={expenseItem.lastTransactionDate}
                  avatar={expenseItem.pictureUrl}
                  group={expenseItem}
                  onClick={(): void =>
                    history.push(`/groups/${expenseItem.id}`)
                  }
                  addExpense={(
                    param: User | Group | undefined,
                  ): Promise<void> => spendBeer(param)}
                />
              ) : (
                <div>Invalid expense type</div>
              ),
            )}
          </List>
          <CallToAction
            icon={<img src={'/images/beer_cheers.svg'} alt="friends" />}
            tooltip={t('group_spendbeer')}
            action={(): void => history.push('/friends')}
          />
        </>
      ) : (
        <Intro />
      )}
    </div>
  );
};
