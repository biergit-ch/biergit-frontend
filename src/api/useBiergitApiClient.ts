import { useCallback } from "react";

import { User } from "../models/User";
import { useAuth0 } from "../auth/auth0-spa";
import { useApiService } from "./useApiService";
import { Expense } from "../models/Expense";
import { ExpensePair } from "../models/ExpensePair";
import { Group } from "../models/Group";

export const useBiergitApiClient = () => {
  const { getData, postData } = useApiService();

  const { loading, isAuthenticated } = useAuth0();

  const getCurrentUser = useCallback(async (): Promise<User> => {
    if (!loading && isAuthenticated) {
      const user = await getData<User | undefined>("/users/me");
      if (user) {
        return new User(user);
      }
    }
    return <User>{};
  }, [loading, isAuthenticated, getData]);

  const getUsers = useCallback(async (): Promise<User[]> => {
    if (!loading && isAuthenticated) {
      const users = await getData<User[] | undefined>("/users");
      if (users && users.length > 0) {
        return users.map((user) => new User(user));
      }
    }
    return [] as User[];
  }, [loading, isAuthenticated, getData]);

  const getMyDirectExpenses = useCallback(async (): Promise<ExpensePair[]> => {
    if (!loading && isAuthenticated) {
      const expenses = await getData<ExpensePair[]>("/expenses");
      if (expenses && expenses.length > 0) {
        return expenses
          .map((expensePair) => new ExpensePair(expensePair))
          .filter((expense) => expense.context.type === "direct");
      }
    }
    return [] as ExpensePair[];
  }, [loading, isAuthenticated, getData]);

  const getExpenses = useCallback(async (): Promise<ExpensePair[]> => {
    if (!loading && isAuthenticated) {
      const expenses = await getData<ExpensePair[]>("/expenses");
      if (expenses && expenses.length > 0) {
        return expenses.map((expensePair) => new ExpensePair(expensePair));
      }
    }
    return [] as ExpensePair[];
  }, [loading, isAuthenticated, getData]);

  const addExpense = useCallback(
    async (expense: Expense): Promise<void> => {
      if (!loading && isAuthenticated) {
        await postData("/expenses", expense);
      }
    },
    [loading, isAuthenticated, postData]
  );
  const getGroups = useCallback(async (): Promise<Group[]> => {
    if (!loading && isAuthenticated) {
      const groups = await getData<Group[]>("/groups");
      if (groups && groups.length > 0) {
        return groups.map((group) => new Group(group));
      }
    }
    return [] as Group[];
  }, [loading, isAuthenticated, getData]);

  const getGroupExpenses = useCallback(
    async (groupId: string): Promise<ExpensePair[]> => {
      if (!loading && isAuthenticated) {
        const groupExpensePairs = await getData<ExpensePair[]>(
          `/groups/${groupId}/expenses`
        );
        if (groupExpensePairs && groupExpensePairs.length > 0) {
          return groupExpensePairs.map(
            (groupExpensePair) => new ExpensePair(groupExpensePair)
          );
        }
      }
      return [] as ExpensePair[];
    },
    [loading, isAuthenticated, getData]
  );
  const getGroupById = useCallback(
    async (groupId: string): Promise<Group> => {
      if (!loading && isAuthenticated) {
        const fetchedGroup = await getData<Group>(`/groups/${groupId}`);
        if (fetchedGroup) {
          return new Group(fetchedGroup);
        }
      }
      return {} as Group;
    },
    [loading, isAuthenticated, getData]
  );
  const createGroup = useCallback(
    async (
      groupName: string,
      members: User[] | undefined
    ): Promise<Group | undefined> => {
      if (!loading && isAuthenticated) {
        return await postData<Group>("/groups", {
          groupName,
          members,
          importedAt: new Date().getTime(),
        });
      }
    },
    [loading, isAuthenticated, postData]
  );
  const updateGroup = useCallback(
    async (
      groupId: string,
      groupName: string,
      members: User[] | undefined
    ): Promise<Group | undefined> => {
      if (!loading && isAuthenticated) {
        return await postData<Group>(`/groups/${groupId}`, {
          groupName,
          members,
        });
      }
    },
    [loading, isAuthenticated, postData]
  );

  return {
    getCurrentUser,
    getUsers,
    getMyDirectExpenses,
    getExpenses,
    addExpense,
    getGroups,
    getGroupById,
    getGroupExpenses,
    createGroup,
    updateGroup,
  };
};
