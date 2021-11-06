import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { getToken } from '../../utils';
import { IIngredientResponse } from '../../utils/interfaces';

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
  });

  console.log(ingredients.data);

  return (
    <div className="mt-6">
      {ingredients.data ? (
        ingredients.data.map((ingredient) => (
          <div key={ingredient.id} className="flex flex-wrap space-x-2">
            <div className="px-4 rounded-full text-xs py-1 bg-primary text-white">
              <p>{ingredient.name}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No ingredients available.</p>
      )}
    </div>
  );
};

export default IngredientList;
