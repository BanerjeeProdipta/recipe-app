import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailRegex, getToken } from '../utils';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';
import InputField from '../components/InputField';
import axios from 'axios';

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
  console.log(response.data);
  return response.data;
};

const MyProfile = () => {
  const history = useHistory();

  const accountDetails = useQuery<IData, Error>(['account-details'], () => fetchAccountDetails(), {
    refetchOnWindowFocus: false,
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
    mode: 'onBlur',
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
      toast.success('Profile Updated');
      history.push('/app/agents');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });

  return (
    <div>
      {accountDetails.data ? (
        <form onSubmit={onSubmit} className="space-y-8">
          <h1 className="text-xl font-bold font-leading-10 mb-8">My account</h1>
          <InputField
            label="Email"
            {...register('email')}
            errorMessage={errors.email ? errors.email.message : undefined}
          />
          <InputField label="Name" {...register('name')} errorMessage={errors.name ? errors.name.message : undefined} />{' '}
          <div className="flex justify-center">
            {isDirty && (
              <button
                disabled={!isDirty && isSubmitting}
                className={`bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-full focus:outline-none ${
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
