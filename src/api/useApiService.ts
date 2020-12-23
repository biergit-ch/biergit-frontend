import axios, { AxiosRequestConfig } from 'axios';
import { useAuth0 } from '../auth/auth0-spa';
import { useCallback, useContext } from 'react';
import { ErrorContext } from '../providers/ErrorProvider';

const apiPrefix = process.env.REACT_APP_BACKEND_API_PREFIX
  ? process.env.REACT_APP_BACKEND_API_PREFIX
  : '';
export const useApiService = () => {
  const { getTokenSilently, loading } = useAuth0();
  const { setErrorMessage } = useContext(ErrorContext);

  const getData = useCallback(
    async <T>(url: string): Promise<T | undefined> => {
      if (!loading && url !== '') {
        const token = await getTokenSilently();
        const requestConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const targetUrl = `${apiPrefix}${url}`;
          const res = await axios.get<T>(targetUrl, requestConfig);
          return res.data;
        } catch (error) {
          if (typeof error.response?.data?.message === 'string') {
            setErrorMessage(error.response?.data?.message);
          } else {
            console.log(error.response?.data?.message ?? error);
          }
        }
      }
      return undefined;
    },
    [getTokenSilently, setErrorMessage, loading],
  );

  const postData = useCallback(
    async <T>(url: string, postBody: any): Promise<T | undefined> => {
      if (!loading && url !== '') {
        const token = await getTokenSilently();
        const requestConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const targetUrl = `${apiPrefix}${url}`;
          const res = await axios.post<T>(targetUrl, postBody, requestConfig);
          return res.data;
        } catch (error) {
          if (typeof error.response?.data?.message === 'string') {
            setErrorMessage(error.response?.data?.message);
          } else {
            console.log(error.response?.data?.message ?? error);
          }
        }
      }
      return undefined;
    },
    [getTokenSilently, setErrorMessage, loading],
  );
  return { getData, postData };
};
