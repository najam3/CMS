import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import Roles from "../components/Roles";



const RolesAndPermissionManager = () => {



    return(
        <>
        <Box sx={{p:4}}>
              <Stack direction={"row"} sx={{justifyContent:'space-between'}}>
                <Box>
                    <Typography variant="h4">Roles</Typography>
                    <Typography variant="caption">List of roles</Typography>
                </Box>
                <Button startIcon={<AddIcon />} variant="contained" color="warning">
                        Add new role
                </Button>
              </Stack>
               <Roles />
        </Box>
        </>
    )
};

export default RolesAndPermissionManager;