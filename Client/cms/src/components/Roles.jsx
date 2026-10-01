import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import RolesTable from "../tables/RolesTable";

const Roles = () => {


    return (
        <>
            <Box sx={{ mt: 4 }}>
               <RolesTable />
            </Box>
        </>
    )

};


export default Roles;