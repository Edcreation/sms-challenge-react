import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../redux/redux/hooks';
import api from '../../../utils/axios.config';
import { toast } from 'react-toastify';

export type environment = {
  name: string,
  environment: string,
  description: string,
  secret: string,
}

export const useCreateEnvironment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.token.value);
  const CreateEnvironment = ({ name, environment, description } : environment) => {
    setLoading(true);
    api
      .post('/api/v1/clients', { name, environment, description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setLoading(false);
        toast.success('Environment created.');
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
    CreateEnvironment
  };
};

export const useGetEnvironments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [envs, setEnvs] = useState<environment[]>([]);
  const token = useAppSelector((state) => state.token.value);
  useEffect(() => {
    setLoading(true);
    api
      .get('/api/v1/clients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setLoading(false);
        setEnvs(res.data);
        // setEnvs([
        //   {
        //     secret: 'BPA6c163YOYVXaKTS5JLbJ8EDQZ6PR',
        //     environment: 'prod',
        //     name: 'demo env' ,
        //     description: 'testing environment' ,
        //   }
        // ] as environment[]);
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
    loading,
    error,
    envs
  };
};