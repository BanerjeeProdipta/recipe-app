import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import User from '../pages/User';

const AppWithLogin = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path} component={User} />
        <Route path="*" render={() => <Redirect to={`${path}`} />} />
      </Switch>
    </div>
  );
};

export default AppWithLogin;
