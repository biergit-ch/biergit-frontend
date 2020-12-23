import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "./auth/auth0-spa";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { UserContextProvider } from "./providers/UserContextProvider";
import { TitlebarContextProvider } from "./providers/TitlebarContextProvider";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import { ErrorContextProvider } from "./providers/ErrorProvider";

const onRedirectCallback = (appState: any): void => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN || ""}
      client_id={process.env.REACT_APP_AUTH_CLIENT_ID || ""}
      audience={process.env.REACT_APP_AUTH_AUDIENCE || ""}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <UserContextProvider>
        <TitlebarContextProvider>
          <ErrorContextProvider>
            <App />
          </ErrorContextProvider>
        </TitlebarContextProvider>
      </UserContextProvider>
    </Auth0Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
reportWebVitals();
