import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <div className="text-sm border-primary font-bold">
          <Link
            to="/app/recipes/create"
            className="border-primary border-2 rounded-lg px-4 py-1 hover:text-primary transition delay-100 ease-in-out"
          >
            Create Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
