import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { getToken } from '../../../utils';
import { IIngredientResponse } from '../../../types';
import { CircularProgress } from '@material-ui/core';

const fetchIngredients = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/ingredients/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

const IngredientList = () => {
  const ingredients = useQuery<IIngredientResponse[], Error>(['ingredients'], () => fetchIngredients(), {
    refetchOnWindowFocus: false,
    enabled: getToken() ? true : false,
  });

  return (
    <div>
      {ingredients.data && ingredients.data.length > 0 ? (
        <div>
          <p className="text-xs font-bold mb-4">
            Total: <span className="text-primary">{ingredients.data.length}</span>
          </p>
          <div className="flex flex-wrap">
            {ingredients.data.map((ingredient) => (
              <div key={ingredient.id}>
                <div className="px-2 rounded-lg text-xs py-1 bg-primary bg-opacity-10 text-primary font-semibold mr-1 mb-2">
                  <p>{ingredient.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : ingredients.isLoading ? (
        <CircularProgress />
      ) : (
        <p>No ingredients available.</p>
      )}
    </div>
  );
};

export default IngredientList;
