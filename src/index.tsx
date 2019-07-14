import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import theme from "./theme";

import './i18n';

import { Auth0Provider } from './react-auth0-spa';
import config from "./auth_config.json";
import history from './history';
import Loading from './components/common/Loading';

const onRedirectCallback = (appState: any) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <Suspense fallback={Loading}>
                <App />
            </Suspense>
        </Auth0Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
