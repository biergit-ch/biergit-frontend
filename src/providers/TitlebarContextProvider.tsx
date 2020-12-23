import React, { ReactNode, SetStateAction, ReactElement } from 'react';

type ContextProps = {
  title: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  hasBack: boolean;
  setHasBack: React.Dispatch<SetStateAction<boolean>>;
  hasHamburgerMenu: boolean;
  setHasHamburgerMenu: React.Dispatch<SetStateAction<boolean>>;
  hasMoreOptions: boolean;
  setHasMoreOptions: React.Dispatch<SetStateAction<boolean>>;
  hasSearch: boolean;
  setHasSearch: React.Dispatch<SetStateAction<boolean>>;
};

interface ComponentProps {
  children: ReactNode;
}

export const TitlebarContext = React.createContext({} as ContextProps);

export const TitlebarContextProvider = ({
  children,
}: ComponentProps): ReactElement => {
  const [title, setTitle] = React.useState<string>('');
  const [hasHamburgerMenu, setHasHamburgerMenu] = React.useState<boolean>(true);
  const [hasSearch, setHasSearch] = React.useState<boolean>(false);
  const [hasBack, setHasBack] = React.useState<boolean>(false);
  const [hasMoreOptions, setHasMoreOptions] = React.useState<boolean>(false);
  const titlebarStore = {
    title,
    setTitle,
    hasBack,
    setHasBack,
    hasHamburgerMenu,
    setHasHamburgerMenu,
    hasMoreOptions,
    setHasMoreOptions,
    hasSearch,
    setHasSearch,
  };

  return (
    <TitlebarContext.Provider value={titlebarStore}>
      {children}
    </TitlebarContext.Provider>
  );
};
