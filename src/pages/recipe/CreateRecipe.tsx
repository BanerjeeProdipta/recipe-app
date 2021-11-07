import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/InputField';
import { IIngredientResponse, IRecipeCreate, ITagResponse } from '../../types';
import { getToken } from '../../utils';
import { useForm } from 'react-hook-form';
import { CustomToaster } from '../../components/Toaster';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Select from 'react-select';

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  ingredients: Yup.array().required('Required'),
  tags: Yup.array().required('Required'),
  time_minutes: Yup.number().typeError('Required').required('Required'),
  price: Yup.number().typeError('Required').required('Required'),
});

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

const CreateRecipe = () => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const ingredients = useQuery<IIngredientResponse[], Error>(['ingredients'], () => fetchIngredients(), {
    refetchOnWindowFocus: false,
  });

  const tags = useQuery<ITagResponse[], Error>(['tags'], () => fetchTags(), {
    refetchOnWindowFocus: false,
  });

  const {
    register,
    setValue,
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
    try {
      await axios.post('http://127.0.0.1:8000/api/recipe/recipes/', data, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${getToken() as string}`,
        },
      });
      CustomToaster('Recipe Created!', 'success');
      queryClient.invalidateQueries(['recipes']);
      reset();
      history.push('/app/recipes');
    } catch (error: any) {
      CustomToaster('Failed!', 'danger');
    }
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
          <p className={`font-semibold text-sm mb-2 ${errors.ingredients && 'text-red-500'} `}>Ingredients * </p>
          <Select
            isMulti
            options={ingredients?.data?.map((v) => ({
              label: v.name,
              value: v.id,
            }))}
            onChange={handleIngredientChange}
            placeholder="Search Ingredients"
            className={`w-full rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.ingredients ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
            }`}
          />

          {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>}
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
            onChange={handleTagChange}
            placeholder="Search Tags"
            className={`w-full rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.tags ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
            }`}
          />

          {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>}
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
            {isSubmitting ? 'Creating' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
