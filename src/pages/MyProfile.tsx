import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { lowercaseRegex, uppercaseRegex, numericRegex, specialCharRegex, emailRegex, getToken } from '../utils';
import { RecipeAppApi } from '../config';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';
import InputField from '../components/InputField';
import Icon from '../icons';
import { Link } from 'react-router-dom';

interface IData {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
  password: Yup.string()
    .trim()
    .required('Required')
    .matches(lowercaseRegex, 'one lowercase required!')
    .matches(uppercaseRegex, 'one uppercase required!')
    .matches(numericRegex, 'one number required!')
    .matches(specialCharRegex, 'one special character required!')
    .min(8, 'Minimum 8 characters required!'),
  email: Yup.string().trim().lowercase().required('Required').matches(emailRegex, 'Invalid email format'),
});

console.log(getToken());

const fetchAccountDetails = async () => {
  const response = await RecipeAppApi.get(`accounts/me/`, {
    headers: {
      'WWW-Authenticate': getToken() as string,
    },
  });
  return response.data;
};

const MyProfile = () => {
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const accountDetails = useQuery<IData, Error>(['account-details'], () => fetchAccountDetails(), {
    refetchOnWindowFocus: false,
    onSuccess: async (data) => {
      // * set default values
      reset({
        name: data.name,
        email: data.email,
        password: data.password,
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
      await RecipeAppApi.put(`accounts/me/`, data, {
        headers: {
          'WWW-Authenticate': getToken() as string,
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
        <form className="max-w-6xl space-y-6 rounded-lg border border-primary p-6" onSubmit={onSubmit}>
          <h1 className="text-xl font-bold font-leading-10">Create account</h1>
          <InputField
            label="Email"
            {...register('email')}
            errorMessage={errors.email ? errors.email.message : undefined}
          />
          <div className="relative">
            <span className="z-10 h-full font-normal text-center fill-current placeholder-gray-100 absolute rounded items-center justify-center w-8 right-5 pr-3 py-3">
              <div className="cursor-pointer mt-8" onClick={togglePasswordVisibility}>
                {passwordShown ? (
                  <Icon name="eye-visible" className="h-5 absolute top-10 left-3 text-gray-400 fill-current" />
                ) : (
                  <Icon name="eye-hidden" className="h-5 absolute top-10 left-3 text-gray-400 fill-current" />
                )}
              </div>
            </span>
            <InputField
              label="Password"
              {...register('password')}
              type={passwordShown ? 'text' : 'password'}
              errorMessage={errors.password ? errors.password.message : undefined}
            />
          </div>
          <InputField label="Name" {...register('name')} errorMessage={errors.name ? errors.name.message : undefined} />{' '}
          <div className="flex justify-center">
            <button
              disabled={!isDirty && isSubmitting}
              className={`bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-full focus:outline-none ${
                isDirty && !isSubmitting ? 'opacity-100' : 'opacity-70 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Creating' : 'Create'}
            </button>
          </div>
          <div>
            <Link to="/login" className="text-primary text-sm text-center mt-6">
              Login
            </Link>
          </div>
        </form>
      ) : (
        <p>No Account Found</p>
      )}
    </div>
  );
};

export default MyProfile;
