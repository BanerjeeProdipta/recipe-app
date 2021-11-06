import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <div className="text-sm border-primary font-bold">
          <Link to="/app/recipes/create">Create Recipe</Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
