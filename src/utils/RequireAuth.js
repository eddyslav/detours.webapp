import { useLocation, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    (isAuthenticated && children) || (
      <Navigate to='/login' state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
