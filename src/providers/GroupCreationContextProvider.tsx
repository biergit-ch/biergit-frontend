import React, { ReactNode, SetStateAction, ReactElement } from 'react';
import { User } from '../models/User';
import { isNullOrUndefined } from 'util';

type ContextProps = {
  selectedUsers: User[] | undefined;
  setSelectedUsers: React.Dispatch<SetStateAction<User[]>>;
  toggleSelectedUser: (user: User) => void;
};

interface ComponentProps {
  children: ReactNode;
}

export const GroupCreationContext = React.createContext({} as ContextProps);

export const GroupCreationContextProvider = ({
  children,
}: ComponentProps): ReactElement => {
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const toggleSelectedUser = (user: User): void => {
    if (!isNullOrUndefined(selectedUsers)) {
      const currentIndex = selectedUsers.indexOf(user);
      const newChecked = [...selectedUsers];
      if (currentIndex === -1) {
        newChecked.push(user);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setSelectedUsers(newChecked);
    }
  };

  const groupCreationStore = {
    selectedUsers,
    setSelectedUsers,
    toggleSelectedUser,
  };

  return (
    <GroupCreationContext.Provider value={groupCreationStore}>
      {children}
    </GroupCreationContext.Provider>
  );
};
