import { useAppSelector } from '../../../redux/redux/hooks';
import { useState, useEffect } from 'react';
import api from '../../../utils/axios.config';

export type Recepient = {
    index: string,
    name: string,
    phone: string,
    group: string,
    createdAt: string,
}

export const useRecepients = () => {
  const token = useAppSelector((state) => state.token.value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recepients, setRecepients] = useState<Recepient[]>([]);
  useEffect(() => {
    setLoading(true);
    api
      .get('/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRecepients(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error Occurred.');
        setLoading(false);
      });
  }, [token]);

  return {
    loading,
    error,
    recepients,
  };
};