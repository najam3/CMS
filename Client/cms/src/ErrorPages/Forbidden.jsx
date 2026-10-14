import { Box, Button, Paper, Typography } from "@mui/material";


const Forbidden = () => {



    return(
        <>
         <Paper elevation={2}>
                <Box sx={{display: 'flex', height: 200, width: '100%', alignItems:'center', justifyContent:'center'}}>
                    <Typography variant="h2">Forbidden</Typography>
                </Box>
                <Button>Go Back</Button>
         </Paper>
        </>
    )
};


export default Forbidden;