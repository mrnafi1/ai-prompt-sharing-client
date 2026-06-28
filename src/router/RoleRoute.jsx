import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../components/LoadingSpinner";

// Usage: <RoleRoute allowedRoles={["Admin"]}><AdminPage/></RoleRoute>
const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
