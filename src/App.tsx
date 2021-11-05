import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, RouteProps } from 'react-router-dom';
import AppWithLogin from './layouts/AppWithLogin';
import AppWithoutLogin from './layouts/AppWithoutLogin';
import { isAuthenticate } from './utils';

export const PrivateRoute = ({ children, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={({ location }: any) =>
      isAuthenticate() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: { pathname: location.pathname } },
          }}
        />
      )
    }
  />
);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/app">
          <AppWithLogin />
        </PrivateRoute>
        <Route path="*">
          <AppWithoutLogin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
