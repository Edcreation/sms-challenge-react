import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/redux/hooks';
import { clearToken } from '../redux/redux/slices/tokenSlice';
import store from '../redux/redux/store';

export const isLoggedIn = () => {
  const token = store.getState().token.value;
  if (token) {
    return true;
  }
  return false;
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return handleLogout;
};