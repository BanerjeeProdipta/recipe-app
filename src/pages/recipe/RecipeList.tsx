import React from 'react';
import CreateIngredient from './CreateIngredient';
import IngredientList from './IngredientList';

const RecipeList = () => {
  return (
    <div>
      <CreateIngredient />
      <IngredientList />
    </div>
  );
};

export default RecipeList;
