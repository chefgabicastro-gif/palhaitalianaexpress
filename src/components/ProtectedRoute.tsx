import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const chefName = localStorage.getItem('chef-name');

  if (!chefName) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
