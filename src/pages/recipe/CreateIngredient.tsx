import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomToaster } from '../../components/Toaster';
import axios from 'axios';
import InputField from '../../components/InputField';
import { useForm } from 'react-hook-form';
import { CustomModal } from '../../components/CustomModal';
import { getToken } from '../../utils';

interface IData {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
});

const CreateIngredient = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IData>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/recipe/ingredients/', data, {
        headers: {
          'Content-type': 'application/json',
          'WWW-Authenticate': getToken() as string,
        },
      });
      CustomToaster('Ingredient Created!', 'success');
    } catch (error: any) {
      //   CustomToaster(error.response.data.email[0] || 'Failed!', 'danger');
    }
  });

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="border-2 border-primary rounded-full font-semibold px-4 py-1"
      >
        Create Ingredients{' '}
      </button>
      <CustomModal open={showModal} onClose={() => setShowModal(false)} title="Create Ingredients">
        <form onSubmit={onSubmit}>
          <InputField label="Name" {...register('name')} errorMessage={errors.name ? errors.name.message : undefined} />

          <div className="flex justify-center">
            <button
              disabled={!isDirty && isSubmitting}
              className={`mt-6 bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-full focus:outline-none ${
                isDirty && !isSubmitting ? 'opacity-100' : 'opacity-70 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Creating' : 'Create'}
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateIngredient;
