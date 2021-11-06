import axios from 'axios';
import React, { useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { IIngredientResponse } from '../../types';
import { getToken } from '../../utils';

const loadOptions = async (inputText: string, callback: any) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/ingredients/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  const data: IIngredientResponse[] = response.data;
  return callback(
    data.map((v) => ({
      label: v.name,
      value: v.id,
    })),
  );
};

const CreateRecipe = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<{ id: number }[]>();

  const handleUserChange = useCallback((value: any) => {
    setSelectedIngredients(value);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Recipe</h1>
      <form>
        <div className="w-96">
          <p className="font-semibold text-sm mb-2">Ingredients: </p>
          <AsyncSelect
            isMulti
            name="emails"
            cacheOptions={true}
            value={selectedIngredients}
            loadOptions={loadOptions}
            onChange={handleUserChange}
            placeholder="Select Ingredients"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
