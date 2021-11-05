import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { emailRegex, lowercaseRegex, uppercaseRegex, numericRegex, specialCharRegex } from '../utils';
import Icon from '../icons';
import { RecipeAppApi } from '../config';

interface IData {
  email: string;
  password: string;
  name: string;
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
  name: Yup.string().trim().required('Required'),
});

const CreateAccount = () => {
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
      name: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await RecipeAppApi.post('accounts/create/', data);
      history.push('/login');
    } catch (error: any) {
      console.log(error);
    }
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="max-w-4xl space-y-6 rounded border p-6" onSubmit={onSubmit}>
        <h1 className="text-xl font-bold font-leading-10">Create account</h1>
        <div>
          <p className="text-sm mb-2">Email</p>
          <div>
            <input
              {...register('email')}
              className="w-full bg-gray-100 border focus:outline-none rounded-md p-2"
              placeholder="Your email"
            />
            {errors.email && <p className="text-red-500 text-sm font-semibold mt-1">{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <p className="text-sm mb-2">Password</p>
          <div className="relative">
            <span className="z-10 h-full font-normal text-center fill-current placeholder-gray-100 absolute rounded items-center justify-center w-8 right-5 pr-3 py-3">
              <div className="cursor-pointer mt-8" onClick={togglePasswordVisibility}>
                {passwordShown ? (
                  <Icon name="eye-visible" className="h-5 absolute top-2.5 left-3 text-gray-400 fill-current" />
                ) : (
                  <Icon name="eye-hidden" className="h-5 absolute top-2.5 left-3 text-gray-400 fill-current" />
                )}
              </div>
            </span>
            <input
              {...register('password')}
              className="w-full bg-gray-100 border focus:outline-none rounded-md p-2 pr-14 mb-3"
              placeholder="Your password"
              type={passwordShown ? 'text' : 'password'}
            />
            {errors.password && <p className="text-red-500 text-sm font-semibold mt-1">{errors.password.message}</p>}
          </div>
        </div>
        <div>
          <p className="text-sm mb-2">Name</p>
          <div>
            <input
              {...register('name')}
              className="w-full bg-gray-100 border focus:outline-none rounded-md p-2"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm font-semibold mt-1">{errors.name.message}</p>}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={!isDirty && isSubmitting}
            className={`bg-blue-800 text-white font-semibold transition duration-500 w-full py-2 rounded-full focus:outline-none ${
              isDirty && !isSubmitting ? 'opacity-100' : 'opacity-70 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Creating' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateAccount;
