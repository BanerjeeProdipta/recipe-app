import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailRegex, getToken } from '../utils';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import InputField from '../components/InputField';
import axios from 'axios';
import { CustomToaster } from '../components/Toaster';

interface IData {
  name: string;
  email: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
  email: Yup.string().trim().lowercase().required('Required').matches(emailRegex, 'Invalid email format'),
});

const fetchAccountDetails = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/accounts/me/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

const MyProfile = () => {
  const queryClient = useQueryClient();
  const accountDetails = useQuery<IData, Error>(['account-details'], () => fetchAccountDetails(), {
    refetchOnWindowFocus: false,
    enabled: getToken() ? true : false,
    onSuccess: async (data) => {
      // * set default values
      reset({
        name: data.name,
        email: data.email,
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      //! Not getting Password on GET So used PATCH for updating account information
      await axios.patch(`http://127.0.0.1:8000/api/accounts/me/`, data, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${getToken() as string}`,
        },
      });
      queryClient.invalidateQueries(['account-details']);
      CustomToaster('Profile Updated', 'success');
    } catch (error: any) {
      CustomToaster('Failed', 'danger');
    }
  });

  return (
    <div>
      {accountDetails.data ? (
        <form onSubmit={onSubmit} className="space-y-8 max-w-lg">
          <h1 className="text-2xl font-bold mb-6">My Account</h1>
          <InputField
            label="Email"
            {...register('email')}
            errorMessage={errors.email ? errors.email.message : undefined}
          />
          <InputField label="Name" {...register('name')} errorMessage={errors.name ? errors.name.message : undefined} />{' '}
          <div className="flex justify-end">
            {isDirty && (
              <button
                disabled={!isDirty && isSubmitting}
                className={`bg-primary text-white font-semibold transition duration-500 px-8 py-2 rounded-lg focus:outline-none ${
                  isDirty && !isSubmitting ? 'opacity-100' : 'cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Updating' : 'Update'}
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>No Account Found</p>
      )}
    </div>
  );
};

export default MyProfile;
