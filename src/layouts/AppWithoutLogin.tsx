import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import User from '../pages/User';

const AppWithoutLogin = () => {
  const { path } = useRouteMatch();

  return (
    <div className="p-6">
      <Switch>
        <Route exact path="/" component={User} />
        <Route exact path="/user/create" component={CreateAccount} />
        <Route path="*" render={() => <Redirect to={`${path}`} />} />
      </Switch>
    </div>
  );
};

export default AppWithoutLogin;
