import { Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import { getRoutes } from "./components/RoleAccessRoute";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/login" element={<Login />} />
                  {getRoutes()}
            </Routes>
            <ToastContainer />
        </ThemeProvider>
    );
}

export default App;
