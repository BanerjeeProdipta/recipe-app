import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, RouteProps } from 'react-router-dom';
import AppWithLogin from './layouts/AppWithLogin';
import AppWithoutLogin from './layouts/AppWithoutLogin';
import { isAuthenticate } from './utils';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="min-h-screen bg-gray-100">
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
    </div>
  );
}

export default App;
