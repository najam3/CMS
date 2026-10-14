import { Box, Typography } from "@mui/material";
import SettingsTable from "../components/SettingsTable";

const Settings = () => {

    return (
            <Box sx={{ p: 4}}>
                <Typography variant="h4" gutterBottom>
                    User management
                </Typography>

                <Typography variant="body1">
                    Manage users and control access to your application from one place. View user accounts, update their information, manage roles and permissions, and make changes to keep your system organized and secure.
                </Typography>
                <Box sx={{mt: 4}}>
                    <SettingsTable />
                </Box>
            </Box>
    
    )
}



export default Settings;