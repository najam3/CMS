import { Box, Stack, Typography } from "@mui/material";

const Footer = () => (
    <Box component="footer" sx={{ mt: "auto", px: { xs: 2, sm: 3, md: 4 }, py: 2, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                © {new Date().getFullYear()} <Box component="span" sx={{ color: "brand.main", fontWeight: 700 }}>Bloggy</Box>. All rights reserved.
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>Admin workspace</Typography>
        </Stack>
    </Box>
);

export default Footer;

