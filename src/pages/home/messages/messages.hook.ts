import { useState } from 'react';
import { useAppSelector } from '../../../redux/redux/hooks';
import api from '../../../utils/axios.config';

export type message = {
    senderId: string,
    message: string,
    recepients: string[],
    apiKey: string,
  }

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const token = useAppSelector((state) => state.token.value);
  const SendMessage = ({ senderId, recepients, message, apiKey } : message) => {
    setLoading(true);
    console.log(senderId, recepients, message, `${apiKey} apiKey`);
    api
      .post('/api/v1/notifications/send-sms', { senderId, recipients: recepients, message }, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        }
      })
      .then(() => {
        setLoading(false);
        setSuccess('Message Sent.');
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
    SendMessage,
    error,
    success
  };
};