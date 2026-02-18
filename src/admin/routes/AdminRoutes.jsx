
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../../Components/Loader';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) return <Loader />;

  if (!user || user.role !== 'ADMIN') return <Navigate to="/" replace />;

  return children;
};

export default AdminRoutes;