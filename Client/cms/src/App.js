import SideBar from "./components/SideBar";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import theme from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import RolesAndPermissionManager from "./pages/RolesAndPermissionManager";
import AllArticles from "./pages/AllArticles";
import CreateNewArticles from "./pages/CreateNewArticles";
import Login from "./components/Login";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<AdminRoute />}>
                    <Route element={<Layout sidebar={<SideBar />} />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/roles" element={<RolesAndPermissionManager />} />
                        <Route path="/allArticles" element={<AllArticles />} />
                        <Route path="/createArticle" element={<CreateNewArticles />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer />
        </ThemeProvider>
    );
}

export default App;
