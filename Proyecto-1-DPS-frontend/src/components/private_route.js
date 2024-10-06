import { useAuth } from "../services/auth_provider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to="/login" />;
    return <Outlet />;
}

export default PrivateRoute