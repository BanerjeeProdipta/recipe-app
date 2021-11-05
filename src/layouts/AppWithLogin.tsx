import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const AppWithLogin = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path="*" render={() => <Redirect to={`${path}`} />} />
      </Switch>
    </div>
  );
};

export default AppWithLogin;
