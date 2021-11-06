import React, { useCallback, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncSelect from 'react-select/async';
import InputField from '../../components/InputField';
import { IIngredientResponse, IRecipeCreate, ITagResponse } from '../../types';
import { getToken } from '../../utils';
import { useForm } from 'react-hook-form';
import { CustomToaster } from '../../components/Toaster';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  // ingredients: number[];
  // tags: number[];
  time_minutes: Yup.number().required('Required'),
  price: Yup.number().required('Required'),
});

const loadIngredientOptions = async (inputText: string, callback: any) => {
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

// const loadTagOptions = async (callback: any) => {
//   const response = await axios.get(`http://127.0.0.1:8000/api/recipe/tags/`, {
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Token ${getToken() as string}`,
//     },
//   });
//   const data: ITagResponse[] = response.data;
//   return callback(
//     data.map((v) => ({
//       label: v.name,
//       value: v.id,
//     })),
//   );
// };

const CreateRecipe = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [selectedIngredients, setSelectedIngredients] = useState<{ id: number }[]>();
  const [selectedTags, setSelectedTags] = useState<{ id: number }[]>();

  const handleIngredientChange = useCallback((value: any) => {
    setSelectedIngredients(value);
  }, []);

  const handleTagChange = useCallback((value: any) => {
    setSelectedTags(value);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IRecipeCreate>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    // try {
    //   await axios.post('http://127.0.0.1:8000/api/recipe/recipes/', data, {
    //     headers: {
    //       'Content-type': 'application/json',
    //       Authorization: `Token ${getToken() as string}`,
    //     },
    //   });
    //   CustomToaster('Recipe Created!', 'success');
    //   queryClient.invalidateQueries(['recipes']);
    //   reset();
    // } catch (error: any) {
    //   CustomToaster('Failed!', 'danger');
    // }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Recipe</h1>
      <form onSubmit={onSubmit} className="lg:w-96 space-y-6">
        <InputField
          label="Title *"
          {...register('title')}
          errorMessage={errors.title ? errors.title.message : undefined}
        />

        <div>
          <p className="font-semibold text-sm mb-2">Ingredients * </p>
          <AsyncSelect
            isMulti
            name="ingredient"
            cacheOptions={true}
            value={selectedIngredients}
            loadOptions={loadIngredientOptions}
            onChange={handleIngredientChange}
            placeholder="Select Ingredients"
          />
        </div>

        {/* <div>
          <p className="font-semibold text-sm mb-2">Tags * </p>
          <AsyncSelect
            isMulti
            name="tag"
            cacheOptions={true}
            value={selectedTags}
            loadOptions={loadTagOptions}
            onChange={handleTagChange}
            placeholder="Select Tags"
          />
        </div> */}

        <InputField
          label="Time in minutes *"
          type="number"
          min={0}
          {...register('time_minutes')}
          errorMessage={errors.time_minutes ? errors.time_minutes.message : undefined}
        />

        <InputField
          label="Price *"
          type="number"
          min={0}
          {...register('price')}
          errorMessage={errors.price ? errors.price.message : undefined}
        />

        <InputField label="Link" type="number" min={0} {...register('link')} />
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => history.push('/app/recipes')}
            className="mt-6 border-2 border-primary text-primary font-semibold transition duration-500 w-full py-2 rounded-lg focus:outline-none"
          >
            Cancel
          </button>
          <button
            disabled={!isDirty && isSubmitting}
            className={`mt-6 bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-lg focus:outline-none ${
              isDirty ? 'opacity-100' : 'cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Creating' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
