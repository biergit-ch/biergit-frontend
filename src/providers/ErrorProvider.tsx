import React, { ReactNode, ReactElement, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

type ContextProps = {
  setErrorMessage: (errorMessage: string) => void;
};

interface ComponentProps {
  children: ReactNode;
}

export const ErrorContext = React.createContext({} as ContextProps);

export const ErrorContextProvider = ({
  children,
}: ComponentProps): ReactElement => {
  const [error, setError] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const setErrorMessage = useCallback(
    (errorMessage: string): void => {
      setError(errorMessage);
      setOpen(true);
    },
    [setError, setOpen],
  );

  const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const errorMessageStore = { setErrorMessage };

  return (
    <ErrorContext.Provider value={errorMessageStore}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};
