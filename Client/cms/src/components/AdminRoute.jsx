import { Navigate, Outlet, useLocation } from "react-router-dom";

const hasValidAdminSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem("signInSession") || "null");
        if (session?.role?.toLowerCase() !== "admin" || !session?.token) return false;

        const tokenParts = session.token.split(".");
        if (tokenParts.length !== 3) return false;

        const base64 = tokenParts[1].replace(/-/g, "+").replace(/_/g, "/");
        const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        const claims = JSON.parse(window.atob(paddedBase64));

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
        localStorage.removeItem("signInSession");
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default AdminRoute;
