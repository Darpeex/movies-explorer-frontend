// НОС - компонент защищающий роут 
import React from 'react';
import { Navigate } from "react-router-dom";
import { ROUTES } from '../../constants/constants';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
export const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to={ROUTES.SIGNIN} replace />
  )
}