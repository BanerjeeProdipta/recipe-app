import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import MyProfile from '../pages/MyProfile';
import { removeAccessToken } from '../utils';

const AppWithLogin = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const handleLogout = () => {
    removeAccessToken();
    history.push('/');
  };

  return (
    <div>
      <nav className="sticky top-0 bg-white py-2 z-50 shadow-lg px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-primary font-bold text-lg">Recipe App</h1>
          <button className="bg-primary text-white rounded-full px-4 py-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="flex justify-center items-center p-6 min-h-screen">
        <div className="p-6 max-w-8xl border border-primary rounded-lg shadow-md">
          <Switch>
            <Route exact path={`${path}/user/profile`} component={MyProfile} />
            <Route path="*" render={() => <Redirect to={`${path}/user/profile`} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AppWithLogin;
