import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/redux/hooks';
import api from '../../../utils/axios.config';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
        navigate('/login');
        setError(err.response.data.message || err.response.data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  }, [token, navigate]);

  return {
    profile,
    error,
    loading
  };

};