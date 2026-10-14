import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import RolesAndPermissionManager from '../pages/RolesAndPermissionManager';
import CreateNewArticles from '../pages/CreateNewArticles';
import AllArticles from '../pages/AllArticles';
import Layout from '../Layout/Layout';
import SideBar from './SideBar';



const RoleAccessRoute = ({ allowedRoles }) => {
    const session = JSON.parse(localStorage.getItem("signInSession") || "null");
    try {
        const claims = jwtDecode(session?.token);
        if (!allowedRoles.includes(claims?.role)) {
            <Navigate to={"/login"} replace />
        } else {
            return <Outlet />
        }
    } catch (error) {
        return <Navigate to="/login" replace />;
    }
};


export default RoleAccessRoute;

export const getRoutes = () => {

    const permissions = { view: ['admin'], update: ['admin', 'author'] };

    return (
        <>
            <Route element={<Layout sidebar={<SideBar />} />}>
                {/* Author */}
                <Route element={<RoleAccessRoute allowedRoles={permissions?.update}/>}>
                    <Route path="/allArticles" element={<AllArticles />} />
                    <Route path="/createArticle" element={<CreateNewArticles />}/>
                </Route>
                {/* Admin */}
                <Route element={<RoleAccessRoute allowedRoles={permissions?.view}/>}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/roles" element={<RolesAndPermissionManager />} />
                    <Route path="/allArticles" element={<AllArticles />} />
                    <Route path="/createArticle" element={<CreateNewArticles />} />
                </Route>
            </Route>
        </>
    );
};