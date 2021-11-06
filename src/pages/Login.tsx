import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { emailRegex, lowercaseRegex, uppercaseRegex, numericRegex, specialCharRegex, setAccessToken } from '../utils';
import Icon from '../icons';
import axios from 'axios';
import { CustomToaster } from '../components/Toaster';
import InputField from '../components/InputField';

interface IData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().lowercase().required('Required').matches(emailRegex, 'Invalid email format'),
  password: Yup.string()
    .trim()
    .required('Required')
    .matches(lowercaseRegex, 'one lowercase required!')
    .matches(uppercaseRegex, 'one uppercase required!')
    .matches(numericRegex, 'one number required!')
    .matches(specialCharRegex, 'one special character required!')
    .min(8, 'Minimum 8 characters required!'),
});

const Login = () => {
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IData>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await axios
      .post('http://localhost:8000/api/accounts/token/', data, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((response: any) => {
        console.log(response.data);
        setAccessToken(response.data.token);
        history.push('/app/user/profile');
      })
      .catch((error: any) => {
        CustomToaster(error.response.data.non_field_errors[0] || 'Failed!', 'danger');
      });
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="max-w-6xl space-y-6 rounded-lg border border-primary p-6 bg-white" onSubmit={onSubmit}>
        <h1 className="text-xl font-bold font-leading-10">Login </h1>
        <div>
          <div>
            <InputField
              label="Email"
              {...register('email')}
              errorMessage={errors.email ? errors.email.message : undefined}
            />
          </div>
        </div>

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

        <div className="flex justify-center">
          <button
            disabled={!isDirty && isSubmitting}
            className={`bg-primary text-white font-semibold transition duration-500 w-full py-2 rounded-lg focus:outline-none ${
              isDirty ? 'opacity-100' : 'opacity-80 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Logging in' : 'Log in'}
          </button>
        </div>
        <div>
          <Link to="/user/create" className="text-primary text-sm text-center mt-6">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
