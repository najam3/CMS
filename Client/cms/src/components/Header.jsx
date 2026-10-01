import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const uploadRef = useRef(null);
    const [session, setSession] = useState(() => {
        try { return JSON.parse(localStorage.getItem("signInSession") || "{}"); }
        catch { return {}; }
    });
    const [photo, setPhoto] = useState(() => localStorage.getItem("profilePhoto"));

    useEffect(() => {
        return () => { if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo); };
    }, [photo]);

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            event.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            try {
                localStorage.setItem("profilePhoto", image);
                setPhoto(image);
            } catch {
                setPhoto(URL.createObjectURL(file));
            }
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    };

    const handleLogout = () => {
        localStorage.removeItem("signInSession");
        localStorage.removeItem("profilePhoto");
        setSession({});
        navigate("/login", { replace: true });
    };

    const displayName = session?.name || session?.fullName || session?.username || session?.email?.split("@")[0] || "Administrator";
    const initials = displayName.split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

    return (
        <Box component="header" sx={{ ...styles.header }}>
            <Box>
                <Typography variant="h6" sx={{ ...styles.title }}>Admin Dashboard</Typography>
                <Typography variant="body2" sx={{ ...styles.subtitle }}>Manage your workspace</Typography>
            </Box>
            <Stack direction="row" spacing={1.5} alignItems="center">
                <input ref={uploadRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} aria-label="Choose profile photo" />
                <Tooltip title="Upload profile photo">
                    <IconButton onClick={() => uploadRef.current?.click()} aria-label="Upload profile photo" sx={{ p: 0.4 }}>
                        <Avatar src={photo || undefined} alt={displayName} sx={{ ...styles.avatar }}>{initials || "A"}</Avatar>
                        <Box sx={{ ...styles.cameraIcon }}><PhotoCameraRoundedIcon sx={{ fontSize: 11 }} /></Box>
                    </IconButton>
                </Tooltip>
                <Box sx={{ display: { xs: "none", sm: "block" }, minWidth: 90 }}>
                    <Typography variant="body2" sx={{ ...styles.displayName }}>{displayName}</Typography>
                    <Typography variant="caption" sx={{ ...styles.role }}>Administrator</Typography>
                </Box>
                <Button onClick={handleLogout} color="inherit" startIcon={<LogoutRoundedIcon />} sx={{ ...styles.logoutButton }}>
                    <Box component="span" sx={{ ...styles.logoutButtonText }}>Logout</Box>
                </Button>
            </Stack>
        </Box>
    );
};

export default Header;

const styles = {
    header:{
        minHeight: 76,
        px: { xs: 2, sm: 3, md: 4 },
        py: 1.5,
        bgcolor: "background.paper",
        borderBottom: "1px solid", borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2
    },
    title: {
        color: "brand.main",
        fontWeight: 750,
        lineHeight: 1.2
    },
    subtitle: {
        color: "text.secondary",
        mt: 0.4
    },
    avatar: {
        width: 42,
        height: 42,
        bgcolor: "primary.main",
        fontWeight: 700
    },
    cameraIcon: {
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 19,
        height: 19,
        borderRadius: "50%",
        bgcolor: "brand.main",
        color: "common.white",
        display: "grid",
        placeItems: "center",
        border: "2px solid", borderColor: "background.paper"
    },
    displayName: {
        color: "text.primary",
        fontWeight: 700
    },
    role: {
        color: "text.secondary"
    },
    logoutButton: {
        color: "text.secondary",
        textTransform: "none",
        fontWeight: 650,
        border: "1px solid", borderColor: "divider",
        borderRadius: 2,
        px: 1.5,
        "&:hover": {
            bgcolor: "action.hover"
        }
    },
  logoutButtonText: {
    display: { xs: "none", sm: "inline" }
  }
}

