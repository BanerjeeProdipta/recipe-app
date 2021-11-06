import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Recipes</h1>
        <Link to="/app/recipes/create" className="text-sm border-primary font-bold">
          Create Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeList;
