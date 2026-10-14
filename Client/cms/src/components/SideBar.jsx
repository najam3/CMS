import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { routes } from "../appRoutes/appRoutes";

const SideBar = () => {
    const [openContent, setOpenContent] = useState(false);
    const [appAllowedRoutes, setAllowedRoutes] = useState([]);
    const session = JSON.parse(localStorage.getItem("signInSession") || "null");
  
function resourceAccessByRole() {
    const allowed = routes.filter(({ permissions }) => {
        if (!permissions) return false;
        const [roles] = permissions.split(":");
        const allowedRoles = roles.split("/");
        return allowedRoles.includes(session.role);
    });
    setAllowedRoutes(allowed);
}


const handleContentClick = (id) => {
    setOpenContent((currentId) =>
        currentId === id ? null : id
    );
};



useEffect(() => {
     resourceAccessByRole()
}, []);

    return (
        <Box sx={layoutStyles}>
            <Paper elevation={3} sx={innerWrapper} className="sidebar">
                <Typography sx={{ p: 3 }} variant="h6">Bloggy</Typography>
                <Box>

                    {
                         appAllowedRoutes?.map((route, index) => (
                            <Box key={route?.name}>
                                {
                                    route?.lists ? (
                                        <Box>
                                            {/* Manage Content */}
                                            <ListItemButton onClick={() => handleContentClick(index)}>
                                                <ListItemIcon>
                                                    {route?.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={route?.name} />
                                                {openContent === index ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            <Collapse in={openContent === index} timeout={"auto"} unmountOnExit>
                                                <List component={"div"} disablePadding>
                                                    {
                                                        route?.lists?.map(list => (
                                                            <ListItemButton LinkComponent={Link} to={list?.url} sx={{ pl: 7 }}>
                                                                <ListItemText primary={list?.name} />
                                                            </ListItemButton>
                                                        ))
                                                    }
                                                </List>
                                            </Collapse>
                                        </Box>
                                    ) : (
                                        <>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {route?.icon}
                                                </ListItemIcon>
                                                <ListItemButton sx={{ pl: 0 }} LinkComponent={Link} to={"/"}>
                                                    <ListItemText primary={route?.name} />
                                                </ListItemButton>
                                            </ListItemButton>

                                        </>
                                    )
                                }
                            </Box>
                        ))
                    }




                </Box>
            </Paper>
        </Box>
    )
};


export default SideBar;



// Styles
const layoutStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh',
    width: '100%',
};

const innerWrapper = {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: 'brand.main',
    color: 'white',
}
const linkStyles = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'inline-block',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: 'primary.main',
}


