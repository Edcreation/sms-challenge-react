import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../redux/redux/hooks';

import { useNavigate } from 'react-router-dom';

export interface ProtectComponentProps {
    children: ReactNode;
    replace?: ReactNode;
}

export const ProtectedComponent: React.FC<ProtectComponentProps> = ({ replace, children }) => {
  const token = useAppSelector((state) => state.token.value);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);
  return isLoggedIn ? children : replace;
};

export const RedirectComponent = ({ to } : { to: string }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return <div className="">Access Denied, Redirecting {to}</div>;
};

