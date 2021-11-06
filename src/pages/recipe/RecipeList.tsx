import React from 'react';
import CreateIngredient from './ingredient/CreateIngredient';
import IngredientList from './ingredient//IngredientList';
import CreateTag from './tag/CreateTag';
import TagList from './tag/TagList';

const RecipeList = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-32">
        <CreateIngredient />
        <IngredientList />
        <CreateTag />
        <TagList />
      </div>
      <div className="flex-1">Recipe</div>
    </div>
  );
};

export default RecipeList;
