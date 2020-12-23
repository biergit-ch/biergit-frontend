import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { UserList } from "../../user/UserList";
import { useBiergitApiClient } from "../../../api/useBiergitApiClient";
import { Group } from "../../../models/Group";
import { TitlebarContext } from "../../../providers/TitlebarContextProvider";
import { Loading } from "../../../common/components/Loading";
import { User } from "../../../models/User";
import { ExpensePair } from "../../../models/ExpensePair";
import { ExpenseSummary } from "../../expenses/ExpenseSummary";
import { Expense, ExpenseDTO } from "../../../models/Expense";
import { UserContext } from "../../../providers/UserContextProvider";
import { Context, ContextDTO } from "../../../models/Context";
import { CallToAction } from "../../cta/CallToAction";
import { useTranslation } from "react-i18next";

export const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { currentUser } = useContext(UserContext);
  const { getGroupById, getGroupExpenses, addExpense } = useBiergitApiClient();
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenes] = useState<ExpensePair[]>([]);
  const [membersWithoutExpense, setMembersWithoutExpense] = useState<User[]>(
    []
  );
  const {
    setTitle,
    setHasMoreOptions,
    setHasHamburgerMenu,
    setHasBack,
  } = useContext(TitlebarContext);
  const { t } = useTranslation();
  const [group, setGroup] = useState<Group>();

  setHasMoreOptions(true);
  setHasBack(true);
  setHasHamburgerMenu(false);

  const initGroupExpenses = useCallback(
    async (groupId: string): Promise<void> => {
      const fetchedGroup = await getGroupById(groupId);
      const groupExpenses = await getGroupExpenses(groupId);
      setExpenes(groupExpenses);
      setGroup(fetchedGroup);
      setTitle(fetchedGroup.groupName);
      if (groupExpenses?.length > 0) {
        const filteredMembers = fetchedGroup.members.filter(
          (user) =>
            !groupExpenses.find(
              (groupExpense) => groupExpense.attendeeTwo?.id === user.id
            )
        );
        setMembersWithoutExpense(filteredMembers);
      } else {
        setMembersWithoutExpense(fetchedGroup.members);
      }
    },
    [getGroupById, getGroupExpenses, setTitle]
  );

  useEffect(() => {
    const initGroup = async (): Promise<void> => {
      if (groupId) {
        setLoading(true);
        await initGroupExpenses(groupId);
        setLoading(false);
      }
    };
    initGroup();
  }, [groupId, initGroupExpenses]);

  const spendBeer = async (user: User): Promise<void> => {
    if (currentUser) {
      const expense: Expense = new Expense({
        userFrom: currentUser.id,
        userTo: user.id,
        amount: 1,
        context: new Context({
          type: "group",
          reference: groupId,
        } as ContextDTO),
      } as ExpenseDTO);
      await addExpense(expense);
      if (groupId) {
        await initGroupExpenses(groupId);
      }
    }
  };

  const spendBeerRound = async (): Promise<void> => {
    if (currentUser && group) {
      setLoading(true);
      for (const member of group.members.filter(
        (u) => u.id !== currentUser?.id
      )) {
        const expense: Expense = new Expense({
          userFrom: currentUser.id,
          userTo: member.id,
          amount: 1,
          context: new Context({
            type: "group",
            reference: group.id,
          } as ContextDTO),
        } as ExpenseDTO);
        await addExpense(expense);
      }
      await initGroupExpenses(group.id);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {group && expenses?.length > 0 && (
            <ExpenseSummary
              expensePairs={expenses}
              context={groupId}
              loadGroupExpenses={initGroupExpenses}
            />
          )}
          {group && membersWithoutExpense && (
            <UserList
              users={membersWithoutExpense}
              handleUserClick={(user: User): Promise<void> => spendBeer(user)}
            />
          )}
        </>
      )}
      <CallToAction
        icon={<img src="/images/beer_cheers.svg" alt="spend_beer" />}
        tooltip={t("group_spendbeer")}
        action={(): Promise<void> => spendBeerRound()}
      />
    </div>
  );
};
