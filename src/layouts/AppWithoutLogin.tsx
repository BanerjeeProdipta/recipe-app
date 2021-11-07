import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';

const AppWithoutLogin = () => {
  return (
    <div>
      <nav className="sticky top-0 bg-white py-2 z-50 shadow-lg px-4">
        <h1 className="text-black font-bold text-lg">Recipe App</h1>
      </nav>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user/create" component={CreateAccount} />
        <Route path="*" render={() => <Redirect to={`/`} />} />
      </Switch>
    </div>
  );
};

export default AppWithoutLogin;
