import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RecipeList from './RecipeList';

const Recipe = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`} component={RecipeList} />
        <Route path="*" render={() => <Redirect to={`${path}`} />} />
      </Switch>
    </div>
  );
};

export default Recipe;
