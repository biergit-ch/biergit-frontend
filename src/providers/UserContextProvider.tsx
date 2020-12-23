import React, { ReactNode, SetStateAction, ReactElement } from 'react';
import { User } from '../models/User';

export const defaultEmptyUser: User = {
  id: '',
  fullName: '',
  email: '',
  firstName: '',
  importedAt: new Date(),
  lastName: '',
  pictureUrl: '',
};

type ContextProps = {
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>;
};

interface ComponentProps {
  children: ReactNode;
}

export const UserContext = React.createContext({} as ContextProps);

export const UserContextProvider = ({
  children,
}: ComponentProps): ReactElement => {
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(
    defaultEmptyUser,
  );
  const userStore = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={userStore}> {children}</UserContext.Provider>
  );
};
