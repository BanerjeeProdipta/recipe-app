import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import MyProfile from '../pages/MyProfile';

const AppWithLogin = () => {
  const { path } = useRouteMatch();

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="p-6 max-w-8xl border border-primary rounded-lg shadow-md">
        <Switch>
          <Route exact path={`${path}/user/profile`} component={MyProfile} />
          <Route path="*" render={() => <Redirect to={`${path}/user/profile`} />} />
        </Switch>
      </div>
    </div>
  );
};

export default AppWithLogin;
