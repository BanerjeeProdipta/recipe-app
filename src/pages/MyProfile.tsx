import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { lowercaseRegex, uppercaseRegex, numericRegex, specialCharRegex, emailRegex, getToken } from '../utils';
import { RecipeAppApi } from '../config';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

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

const fetchAccountDetails = async () => {
  const response = await RecipeAppApi.get(`accounts/me/`, {
    headers: {
      'WWW-Authenticate': getToken() as string,
    },
  });
  return response.data.data;
};

const MyProfile = () => {
  const history = useHistory();

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
          // 'WWW-Authenticate': getToken(),
        },
      });
      toast.success('Profile Updated');
      history.push('/app/agents');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  });

  return <div></div>;
};

export default MyProfile;
