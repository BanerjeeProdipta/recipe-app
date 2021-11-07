import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { CustomModal } from '../../components/CustomModal';
import { CustomToaster } from '../../components/Toaster';
import { IIngredientResponse, IRecipeResponse, ITagResponse } from '../../types';
import { getToken } from '../../utils';

const fetchIngredients = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/ingredients/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

const fetchTags = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/tags/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

const fetchRecipes = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/recipes/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

const RecipeList = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<IRecipeResponse>();

  const recipes = useQuery<IRecipeResponse[], Error>(['recipes'], () => fetchRecipes(), {
    refetchOnWindowFocus: false,
    enabled: getToken() ? true : false,
  });

  const ingredients = useQuery<IIngredientResponse[], Error>(['ingredients'], () => fetchIngredients(), {
    refetchOnWindowFocus: false,
    enabled: getToken() ? true : false,
  });

  const tags = useQuery<ITagResponse[], Error>(['tags'], () => fetchTags(), {
    refetchOnWindowFocus: false,
    enabled: getToken() ? true : false,
  });

  const populateIngredients = (recipe: IRecipeResponse) => {
    let filteredIngredients = ingredients.data?.filter((ingredient) => recipe.ingredients.includes(ingredient.id));
    return (
      <div className="flex flex-wrap my-2">
        {filteredIngredients?.map((ingredient) => (
          <div key={ingredient.id}>
            <div className="px-2 rounded-lg text-xs py-1 bg-primary text-white font-semibold mr-1 mb-2">
              <p>{ingredient.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const populateTags = (recipe: IRecipeResponse) => {
    let filteredTags = tags.data?.filter((tag) => recipe.tags.includes(tag.id));
    return (
      <div className="flex flex-wrap my-2">
        {filteredTags?.map((tag) => (
          <div key={tag.id}>
            <div className="px-2 rounded-lg text-xs py-1 border-2 border-primary text-primary font-semibold mr-1 mb-2">
              <p>{tag.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleDeleteRecipe = async () => {
    try {
      if (recipeToDelete) {
        await axios.delete(`http://127.0.0.1:8000/api/recipe/recipes/${recipeToDelete.id}/`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Token ${getToken() as string}`,
          },
        });
        queryClient.invalidateQueries(['recipes']);
        // setShowModal(false);
        CustomToaster('Deleted', 'success');
      }
    } catch (error: any) {
      CustomToaster(error.response.data.detail || 'Failed', 'danger');
      setShowModal(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
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
      <div>
        {recipes.data && recipes.data.length > 0 ? (
          <div>
            {recipes.data.map((recipe) => (
              <div key={recipe.id} className="border rounded-md my-2 p-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-medium text-lg mb-2">{recipe.title}</h1>
                  <div className="flex items-center">
                    <Link to={`/app/recipes/${recipe.id}/edit`} className="text-primary font-bold text-sm mr-1">
                      Edit
                    </Link>
                    <button
                      className="text-red-600 font-bold text-sm"
                      onClick={() => {
                        setShowModal(true);
                        setRecipeToDelete(recipe);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div>{populateIngredients(recipe)}</div>
                <div>{populateTags(recipe)}</div>
                <div>
                  <p>
                    <span className="text-primary font-medium">Price:</span>
                    <span className="text-sm font-semibold"> $ {recipe.price}</span>
                  </p>
                  <p>
                    <span className="text-primary font-medium">Time:</span>
                    <span className="text-sm font-semibold"> {recipe.time_minutes} min</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.isLoading ? (
          <div className="h-96 flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <p>No recipes available.</p>
          </div>
        )}
      </div>
      <CustomModal open={showModal} onClose={() => setShowModal(false)} title="Delete Recipe">
        <div>
          <h1 className="font-semibold">
            Are you sure you want to delete <span className="text-primary font-bold">{recipeToDelete?.title}</span> ?
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-6 border-2 border-primary text-primary font-semibold transition duration-500 w-full py-2 rounded-lg focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteRecipe}
              className={`mt-6 bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-lg focus:outline-none`}
            >
              Delete
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default RecipeList;
