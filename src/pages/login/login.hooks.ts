import { useState } from 'react';
import { useAppDispatch } from '../../redux/redux/hooks';
import api from '../../utils/axios.config';
import { setToken } from '../../redux/redux/slices/tokenSlice';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const handleLogin = ({
    email,
    password,
  }: {
          email: string;
          password: string;
      }) => {
    setLoading(true);
    if (email === '' || password === '') {
      email === '' ? setError('Email is Required') : setError('Password is Required');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    api
      .post('/api/v1/users/login', { email, password })
      .then((res) => {
        setLoading(false);
        dispatch(setToken(res.data.access_token as string));
        location.href = '/home';
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message || err.response.data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  return {
    loading,
    error,
    handleLogin
  };
};