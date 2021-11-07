import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/InputField';
import { IIngredientResponse, IRecipeEdit, IRecipeResponse, ITagResponse } from '../../types';
import { getToken } from '../../utils';
import { useForm } from 'react-hook-form';
import { CustomToaster } from '../../components/Toaster';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import Select from 'react-select';
import { CircularProgress } from '@material-ui/core';

interface params {
  id: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  ingredients: Yup.array().required('Required'),
  tags: Yup.array().required('Required'),
  time_minutes: Yup.number().typeError('Required').required('Required'),
  price: Yup.number().typeError('Required').required('Required'),
});

const fetchRecipe = async (id: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/recipes/${id}/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

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

const EditRecipe = () => {
  const params = useParams<params>();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [selectedIngredients, setSelectedIngredients] = useState<{ label: string; value: number }[]>();
  const [selectedTags, setSelectedTags] = useState<{ label: string; value: number }[]>();

  const ingredients = useQuery<IIngredientResponse[], Error>(['ingredients'], () => fetchIngredients(), {
    refetchOnWindowFocus: false,
  });

  const tags = useQuery<ITagResponse[], Error>(['tags'], () => fetchTags(), {
    refetchOnWindowFocus: false,
  });

  const recipe = useQuery<IRecipeResponse, Error>(['recipe', params.id], () => fetchRecipe(params.id), {
    refetchOnWindowFocus: false,
    onSuccess: async (data) => {
      // * set default values
      let ingredientsArray: { label: string; value: number }[] = [];
      if (data.ingredients.length > 0) {
        ingredientsArray = data.ingredients.map((ingredient: any) => {
          return {
            value: ingredient.id,
            label: ingredient.name,
          };
        });
      }

      if (ingredientsArray) {
        setValue(
          'ingredients',
          ingredientsArray.map((ingredient: { value: number; label: string }) => ingredient.value),
        );

        setSelectedIngredients(ingredientsArray);
      }

      let tagsArray: { label: string; value: number }[] = [];
      if (data.tags.length > 0) {
        tagsArray = data.tags.map((tag: any) => {
          return {
            value: tag.id,
            label: tag.name,
          };
        });
      }

      if (tagsArray) {
        setValue(
          'tags',
          tagsArray.map((tag: { value: number; label: string }) => tag.value),
        );

        setSelectedTags(selectedTags);
      }
      console.log(tagsArray);

      reset({
        title: data.title,
        ingredients: data.ingredients,
        tags: data.tags,
        time_minutes: data.time_minutes,
        price: data.price,
      });
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IRecipeEdit>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  });

  const handleIngredientChange = (ingredientsSelected: any) => {
    setValue(
      'ingredients',
      ingredientsSelected.map((ingredient: { value: number; label: string }) => ingredient.value),
    );
  };

  const handleTagChange = (tagsSelected: any) => {
    setValue(
      'tags',
      tagsSelected.map((tag: { value: number; label: string }) => tag.value),
    );
  };

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
    //   history.push('/app/recipes');
    // } catch (error: any) {
    //   CustomToaster('Failed!', 'danger');
    // }
  });

  return (
    <div className="w-full lg:max-w-md">
      <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>
      {recipe.data ? (
        <form onSubmit={onSubmit} className="lg:w-96 space-y-6">
          <InputField
            label="Title *"
            {...register('title')}
            errorMessage={errors.title ? errors.title.message : undefined}
          />

          <div>
            <p className={`font-semibold text-sm mb-2 ${errors.ingredients && 'text-red-500'} `}>Ingredients * </p>
            <Select
              isMulti
              options={ingredients?.data?.map((v) => ({
                label: v.name,
                value: v.id,
              }))}
              defaultValue={selectedIngredients}
              onChange={handleIngredientChange}
              placeholder="Search Ingredients"
              className={`w-full rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.ingredients ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
              }`}
            />

            {/* {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>} */}
          </div>

          <div>
            <p className={`font-semibold text-sm mb-2 ${errors.tags && 'text-red-500'} `}>Tags * </p>
            <Select
              isMulti
              name="tags"
              options={tags?.data?.map((v) => ({
                label: v.name,
                value: v.id,
              }))}
              defaultValue={selectedTags}
              onChange={handleTagChange}
              placeholder="Search Tags"
              className={`w-full rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.tags ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
              }`}
            />

            {/* {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>} */}
          </div>

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

          <InputField label="Link" {...register('link')} />

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
              {isSubmitting ? 'Updating' : 'Update'}
            </button>
          </div>
        </form>
      ) : recipe.isLoading ? (
        <div className="h-96 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <p>No recipes available.</p>
        </div>
      )}
    </div>
  );
};

export default EditRecipe;
