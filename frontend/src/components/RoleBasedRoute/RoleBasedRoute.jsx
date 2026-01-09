import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ children, requiredRole }) => {
    const { user } = useSelector((state) => state.user);

    if (!user) return <Navigate to="/sign-in" replace />;

    if (user.role !== requiredRole) {
        return <Navigate to="/NotFoundPage" replace />;
    }

    return children;
};

export default RoleBasedRoute;