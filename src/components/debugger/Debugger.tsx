import React, { useContext, useState } from 'react';
import ReactJson from 'react-json-view';
import { useAuth0 } from '../../auth/auth0-spa';
import { Loading } from '../../common/components/Loading';
import {
  Button,
  Typography,
  TextField,
  Grid,
  Container,
} from '@material-ui/core';
import axios, { AxiosRequestConfig } from 'axios';
import { UserContext } from '../../providers/UserContextProvider';

import { Expense, ExpenseDTO } from '../../models/Expense';
import { LandingPage } from '../landing/LandingPage';
import { CallToAction } from '../cta/CallToAction';

const apiPrefix = process.env.REACT_APP_BACKEND_API_PREFIX
  ? process.env.REACT_APP_BACKEND_API_PREFIX
  : '';

interface FormState {
  userToId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseText: any;
}

const Debugger: React.FC = () => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formValues, setFormValues] = useState<FormState>({
    userToId: '',
    responseText: {},
  });

  const getAccessToken = async (): Promise<void> => {
    const token = await getTokenSilently();
    setFormValues({ ...formValues, responseText: { token: token } });
  };

  const handleChange = (prop: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const getUsers = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any = '';
    const token = await getTokenSilently();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        accept: 'application/vnd.biergit.api.v1+json',
      },
    };
    try {
      response = await axios.get(`${apiPrefix}/users`, requestConfig);
    } catch (e) {
      const error = {
        message: e.message || '',
        status: e.response?.status || '',
        statusText: e.response?.statusText || '',
      };
      response = { data: error };
    }
    setFormValues({ ...formValues, responseText: response.data });
  };

  const getUserMe = async (): Promise<void> => {
    const token = await getTokenSilently();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        accept: 'application/vnd.biergit.api.v1+json',
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any = '';
    try {
      response = await axios.get(`${apiPrefix}/users/me`, requestConfig);
    } catch (e) {
      const error = {
        message: e.message || '',
        status: e.response?.status || '',
        statusText: e.response?.statusText || '',
      };
      response = { data: error };
    }
    setFormValues({ ...formValues, responseText: response.data });
    setCurrentUser(response?.data);
  };

  const helloBeer = async (): Promise<void> => {
    const token = await getTokenSilently();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any = '';
    try {
      response = await axios.get(`${apiPrefix}/hello/beer`, requestConfig);
    } catch (e) {
      const error = {
        message: e.message || '',
        status: e.response?.status || '',
        statusText: e.response?.statusText || '',
      };
      response = { data: error };
    }
    setFormValues({ ...formValues, responseText: response.data });
  };

  const getExpenses = async (): Promise<void> => {
    const token = await getTokenSilently();
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any = '';
    try {
      response = await axios.get(`${apiPrefix}/expenses`, requestConfig);
    } catch (e) {
      const error = {
        message: e.message || '',
        status: e.response?.status || '',
        statusText: e.response?.statusText || '',
      };
      response = { data: error };
    }
    setFormValues({ ...formValues, responseText: response.data });
  };

  const postExpenses = async (): Promise<void> => {
    if (currentUser) {
      const token = await getTokenSilently();
      const requestConfig: AxiosRequestConfig = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let response: any = '';
      const expense: Expense = new Expense({
        userFrom: currentUser.id,
        userTo: formValues.userToId,
      } as ExpenseDTO);
      try {
        response = await axios.post(
          `${apiPrefix}/expenses`,
          expense,
          requestConfig,
        );
      } catch (e) {
        const error = {
          message: e.message || '',
          status: e.response?.status || '',
          statusText: e.response?.statusText || '',
        };
        response = { data: error };
      }
      setFormValues({ ...formValues, responseText: response.data });
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : isAuthenticated ? (
        <Grid container spacing={3} alignItems="stretch" alignContent="center">
          <Grid item xs={3}>
            <Typography component="h5" variant="h5" gutterBottom>
              Hello Actions
            </Typography>
            <Button
              onClick={(): Promise<void> => helloBeer()}
              variant="contained"
              color="primary"
            >
              GET /hello/beer
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Typography component="h5" variant="h5" gutterBottom>
              User Actions
            </Typography>
            <Button
              onClick={(): Promise<void> => getAccessToken()}
              variant="contained"
              color="primary"
            >
              Get AccessToken
            </Button>

            <br />
            <br />

            <Button
              onClick={(): Promise<void> => getUserMe()}
              variant="contained"
              color="primary"
            >
              GET /users/me
            </Button>

            <br />
            <br />
            <Button
              onClick={(): Promise<void> => getUsers()}
              variant="contained"
              color="primary"
            >
              GET /users
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Typography component="h5" variant="h5" gutterBottom>
              Expenses Actions
            </Typography>
            <Button
              onClick={(): Promise<void> => getExpenses()}
              variant="contained"
              color="primary"
            >
              GET /expenses
            </Button>
            <br />
            <br />
            <form>
              <div>
                <Button
                  onClick={(): Promise<void> => postExpenses()}
                  variant="contained"
                  color="primary"
                >
                  POST /expenses
                </Button>
                <TextField
                  label="userIdTo"
                  value={formValues.userToId}
                  onChange={handleChange('userToId')}
                />
              </div>
            </form>
          </Grid>
          <Grid item xs={3}>
            <Typography component="h5" variant="h5" gutterBottom>
              Transaction Actions
            </Typography>
            <Button
              // onClick={() => getTransactions()}
              variant="contained"
              color="primary"
            >
              GET /expenses/:expenseId/transactions
            </Button>
            <br />
            <br />
            <Button
              // onClick={() => postTransactions()}
              variant="contained"
              color="primary"
            >
              POST /expenses/:expenseId/transactions
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h5" variant="h5" gutterBottom>
              API Response
            </Typography>
            <ReactJson src={formValues.responseText} />
          </Grid>
        </Grid>
      ) : (
        <LandingPage />
      )}
      <CallToAction
        action={(): void => alert('hello world')}
        tooltip="Hello World"
        icon="bug_report"
      />
    </Container>
  );
};

export default Debugger;
