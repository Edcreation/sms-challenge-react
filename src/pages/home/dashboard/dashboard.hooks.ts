import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../redux/redux/hooks';
import api from '../../../utils/axios.config';

export type environment = {
  name: string,
  environment: string,
  description: string,
  secret: string,
}

export const useCreateEnvironment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
        setSuccess('Environment created.');
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
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
    CreateEnvironment,
    success
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
      .then(() => {
        setLoading(false);
        // setEnvs(res.data);
        setEnvs([
          {
            secret: 'BPA6c163YOYVXaKTS5JLbJ8EDQZ6PR',
            environment: 'dev',
            name: 'demo env' ,
            description: 'testing environment' ,
          },
          {
            secret: 'BPA6c163YOYVXaKTS5JLbJ8EDQZ6PR',
            environment: 'prod',
            name: 'demo env' ,
            description: 'testing environment' ,
          },
          {
            secret: 'BPA6c163YOYVXaKTS5JLbJ8EDQZ6PR',
            environment: 'dev',
            name: 'demo env' ,
            description: 'testing environment' ,
          },
          {
            secret: 'BPA6c163YOYVXaKTS5JLbJ8EDQZ6PR',
            environment: 'prod',
            name: 'demo env' ,
            description: 'testing environment' ,
          }
        ] as environment[]);
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