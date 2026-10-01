import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#D62828",
            light: "#FBE9E9",
            dark: "#B21F24",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#ECA72C",
            light: "#FFF4DC",
            dark: "#9B6A10",
            contrastText: "#263746",
        },
        brand: {
            main: "#003049",
            dark: "#002236",
            light: "#EAF1F5",
        },
        background: {
            default: "#F4F6F8",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#263746",
            secondary: "#718096",
            disabled: "#98A5B1",
        },
        divider: "#E5EAF0",
        success: { main: "#2E8B68", light: "#E8F5EE", dark: "#24734F" },
        warning: { main: "#ECA72C", light: "#FFF5DF", dark: "#9B6A10" },
        error: { main: "#C43D3D", light: "#FBEAEA", dark: "#9B2525" },
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
        h1: { fontWeight: 750, letterSpacing: "-0.035em" },
        h2: { fontWeight: 750, letterSpacing: "-0.03em" },
        h3: { fontWeight: 750, letterSpacing: "-0.025em" },
        h4: { fontWeight: 750, letterSpacing: "-0.02em" },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { fontWeight: 650, textTransform: "none" },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: { minWidth: 320 },
                body: { minHeight: "100vh" },
                "#root": { minHeight: "100vh" },
            },
        },
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { backgroundImage: "none" },
                outlined: ({ theme }) => ({ borderColor: theme.palette.divider }),
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius + 4,
                    boxShadow: "none",
                }),
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { borderRadius: 10, textTransform: "none", fontWeight: 650 },
                containedPrimary: ({ theme }) => ({
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper,
                }),
            },
        },
        MuiTextField: { defaultProps: { variant: "outlined" } },
        MuiChip: {
            styleOverrides: {
                root: { borderRadius: 8, fontWeight: 600 },
            },
        },
    },
});

export default theme;

