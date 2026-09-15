import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ReactNode } from 'react';
import { Spinner } from '../spinner';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode;
};

export function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteProps) {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} replace />
  );
}
