import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ sidebar }) {
    return (
        <Stack direction="row" sx={{ minHeight: "100vh", alignItems: "stretch", bgcolor: "background.default" }}>
            <Box component="aside" sx={{ ...sidebarContainer }}>{sidebar}</Box>
            <Box sx={{ ...contentContainer }}>
                <Header />
                <Box component="main" sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1 }}>
                    <Outlet />
                </Box>
                <Footer />
            </Box>
        </Stack>
    );
}

const sidebarContainer = { width: 250, flexShrink: 0, display: "flex", alignSelf: "stretch" };
const contentContainer = { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" };
