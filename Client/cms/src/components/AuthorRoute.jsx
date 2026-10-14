import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const hasValidEditorSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem("signInSession") || "null");
        const claims = jwtDecode(session?.token);
 
        return claims.role === "author"
            && typeof claims.exp === "number"
            && claims.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

const AuthorRoute = () => {
    const location = useLocation();
    if (!hasValidEditorSession()) {
        localStorage.removeItem("signInSession");
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default AuthorRoute;
