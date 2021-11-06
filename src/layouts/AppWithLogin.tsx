import React from 'react';
import { NavLink, Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import MyProfile from '../pages/MyProfile';
import Recipe from '../pages/recipe';
import { removeAccessToken } from '../utils';

const AppWithLogin = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const handleLogout = () => {
    removeAccessToken();
    history.push('/');
  };

  // TODO Check if user is logged in

  return (
    <div>
      <nav className="sticky top-0 bg-white py-2 z-50 shadow-lg px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-black font-bold text-lg">Recipe App</h1>
          <div>
            <NavLink
              to="/app/recipes"
              activeClassName="text-primary"
              className="font-medium text-black rounded-lg px-4 py-2 hover:underline"
            >
              Recipes
            </NavLink>
            <NavLink
              to="/app/user/profile"
              activeClassName="text-primary"
              className="font-medium text-black rounded-lg px-4 py-2 hover:underline"
            >
              Profile
            </NavLink>
          </div>
          <button className="bg-primary text-white rounded-lg px-4 py-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="flex justify-center p-6">
        <div className="p-6 max-w-5xl container border mx-auto bg-white rounded-lg shadow-md">
          <Switch>
            <Route exact path={`${path}/user/profile`} component={MyProfile} />
            <Route path={`${path}/recipes`} component={Recipe} />
            <Route path="*" render={() => <Redirect to={`${path}/recipes`} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AppWithLogin;
