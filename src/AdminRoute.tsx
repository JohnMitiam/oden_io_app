
import { Navigate } from 'react-router';
import { useAuth } from './contexts/AuthContext';

interface Props {
    children: React.ReactNode;
}

export const AdminRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <>Loading...</>;
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};