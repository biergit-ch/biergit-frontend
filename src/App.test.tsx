import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import { Auth0Provider } from './auth/auth0-spa';

let container: any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  act(() => {
    ReactDOM.render(
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN || ''}
        client_id={process.env.REACT_APP_AUTH_CLIENT_ID || ''}
        redirect_uri={window.location.origin}
      >
        <App />
      </Auth0Provider>,
      container,
    );
  });
});
