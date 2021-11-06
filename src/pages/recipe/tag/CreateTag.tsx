import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomToaster } from '../../../components/Toaster';
import axios from 'axios';
import InputField from '../../../components/InputField';
import { useForm } from 'react-hook-form';
import { CustomModal } from '../../../components/CustomModal';
import { getToken } from '../../../utils';
import { useQueryClient } from 'react-query';

interface IData {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
});

const CreateTag = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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
      await axios.post('http://127.0.0.1:8000/api/recipe/tags/', data, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${getToken() as string}`,
        },
      });
      CustomToaster('Ingredient Created!', 'success');
      queryClient.invalidateQueries(['tag']);
      reset();
    } catch (error: any) {
      CustomToaster('Failed!', 'danger');
    }
  });

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="border-2 border-primary rounded-full font-semibold text-xs px-4 py-1"
      >
        Create Tag{' '}
      </button>
      <CustomModal open={showModal} onClose={() => setShowModal(false)} title="Create Tag">
        <form onSubmit={onSubmit}>
          <InputField label="Name" {...register('name')} errorMessage={errors.name ? errors.name.message : undefined} />

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-6 border-2 border-primary text-primary font-semibold transition duration-500 w-full py-2 rounded-full focus:outline-none"
            >
              Close
            </button>
            <button
              disabled={!isDirty && isSubmitting}
              className={`mt-6 bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-full focus:outline-none ${
                isDirty ? 'opacity-100' : 'cursor-not-allowed'
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

export default CreateTag;
