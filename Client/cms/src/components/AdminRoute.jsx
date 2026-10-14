import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const hasValidAdminSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem("signInSession") || "null");
        if (session?.role?.toLowerCase() !== "admin" || !session?.token) return false;

        const claims = jwtDecode(session?.token);
 
        return claims.role === "admin"
            && typeof claims.exp === "number"
            && claims.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};


const AdminRoute = () => {
    const location = useLocation();
    if (!hasValidAdminSession()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default AdminRoute;
