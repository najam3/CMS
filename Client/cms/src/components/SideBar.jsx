import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const [openContent, setOpenContent] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleContentClick = () => setOpenContent(!openContent);

    return (
        <Box sx={layoutStyles}>
            <Paper elevation={3} sx={innerWrapper} className="sidebar">
                <Typography sx={{ p: 3 }} variant="h6">Bloggy</Typography>
                <Box>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon sx={{ color: 'common.white' }} />
                        </ListItemIcon>
                        <ListItemButton sx={{ pl: 0 }} LinkComponent={Link} to={"/"}>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItemButton>



                    {/* Manage Content */}
                    <ListItemButton onClick={handleContentClick}>
                        <ListItemIcon>
                            <ContentCopyIcon sx={{ color: 'common.white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Content" />
                        {openContent ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openContent} timeout={"auto"} unmountOnExit>
                        <List component={"div"} disablePadding>
                            <ListItemButton LinkComponent={Link} to="/allArticles" sx={{ pl: 7 }}>
                                <ListItemText primary="All Articles" />
                            </ListItemButton>
                            <ListItemButton LinkComponent={Link} to="/createArticle" sx={{ pl: 7 }}>
                                <ListItemText primary="Create new article" />
                            </ListItemButton>
                            <ListItemButton LinkComponent={Link} to="/settings" sx={{ pl: 7 }}>
                                <ListItemText primary="Categories" />
                            </ListItemButton>
                        </List>
                    </Collapse>



                    {/* Adminstrative Settings */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <SettingsIcon sx={{ color: 'common.white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open} timeout={"auto"} unmountOnExit>
                        <List component={"div"} disablePadding>
                            <ListItemButton LinkComponent={Link} to="/settings" sx={{ pl: 7 }}>
                                <ListItemText primary="User management" />
                            </ListItemButton>
                            <ListItemButton LinkComponent={Link} to="/roles" sx={{ pl: 7 }}>
                                <ListItemText primary="Roles and Permissions" />
                            </ListItemButton>
                        </List>
                    </Collapse>


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


