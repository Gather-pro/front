import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ activeUser, children }) => {
  if (!activeUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
