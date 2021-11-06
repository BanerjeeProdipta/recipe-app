import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import CreateRecipe from './CreateRecipe';
import CreateIngredient from './ingredient/CreateIngredient';
import IngredientList from './ingredient/IngredientList';
import RecipeList from './RecipeList';
import CreateTag from './tag/CreateTag';
import TagList from './tag/TagList';

const Recipe = () => {
  const { path } = useRouteMatch();

  return (
    <div className="lg:flex flex-wrap w-full">
      <div className="space-y-2 lg:w-48 lg:mr-6 lg:border-r">
        <CreateIngredient />
        <div className="max-h-64 overflow-auto py-2">
          <IngredientList />
        </div>
        <CreateTag />
        <div className="max-h-64 overflow-auto py-2">
          <TagList />
        </div>
      </div>
      <div className="flex flex-1">
        <Switch>
          <Route path={`${path}`} component={RecipeList} />
          <Route path={`${path}/create`} component={CreateRecipe} />
          <Route path="*" render={() => <Redirect to={`${path}/recipes`} />} />
        </Switch>
      </div>
    </div>
  );
};

export default Recipe;
