import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/redux/hooks';
import api from '../../../utils/axios.config';

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    createdAt: string,
  }

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const token = useAppSelector((state) => state.token.value);
  useEffect(() => {
    setLoading(true);
    api
      .get('/api/v1/users/check', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setLoading(false);
        setProfile(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message || err.response.data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  }, [token]);

  return {
    profile,
    error,
    loading
  };

};