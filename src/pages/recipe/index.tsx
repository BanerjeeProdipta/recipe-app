import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import CreateRecipe from './CreateRecipe';
import RecipeList from './RecipeList';
import Sidebar from './Sidebar';

const Recipe = () => {
  const { path } = useRouteMatch();

  return (
    <div className="lg:flex flex-wrap w-full">
      <Sidebar />
      <div className="flex flex-1">
        <Switch>
          <Route exact path={`${path}`} component={RecipeList} />
          <Route exact path={`${path}/create`} component={CreateRecipe} />
          <Route path="*" render={() => <Redirect to={`${path}/recipes`} />} />
        </Switch>
      </div>
    </div>
  );
};

export default Recipe;
