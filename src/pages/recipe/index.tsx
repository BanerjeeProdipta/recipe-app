import React from 'react';
import CreateRecipe from './CreateRecipe';
import CreateIngredient from './ingredient/CreateIngredient';
import IngredientList from './ingredient/IngredientList';
import RecipeList from './RecipeList';
import CreateTag from './tag/CreateTag';
import TagList from './tag/TagList';

const Recipe = () => {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-32">
          <CreateIngredient />
          <IngredientList />
          <CreateTag />
          <TagList />
        </div>
        <div className="flex-1">
          <div>
            <CreateRecipe />
            <RecipeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
