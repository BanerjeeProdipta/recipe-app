import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';

const AppWithoutLogin = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/user/create" component={CreateAccount} />
      <Route path="*" render={() => <Redirect to={`/`} />} />
    </Switch>
  );
};

export default AppWithoutLogin;
