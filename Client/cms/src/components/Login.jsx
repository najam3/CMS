import { useState } from "react";
import { Alert, Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: "" }));
        setMessage("");
    };

    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim();
        if (!email) nextErrors.email = "Enter your email address.";
        else if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Enter a valid email address.";
        if (!form.password) nextErrors.password = "Enter your password.";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const response = await loginUser({
                email: form.email.trim().toLowerCase(),
                password: form.password,
            });
            const user = response?.data?.user;

            if (user?.role?.toLowerCase() !== "admin" || !user?.token) {
                setMessage("Only active administrator accounts can access this portal.");
                return;
            }

            localStorage.setItem("signInSession", JSON.stringify(user));
            navigate("/", { replace: true });
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) setMessage("Email or password is incorrect.");
            else if (status === 403) setMessage(error.response?.data?.message || "Only active administrator accounts can access this portal.");
            else if (status === 400) setMessage(error.response?.data?.message || "Check your details and try again.");
            else setMessage("We couldn't sign you in. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, bgcolor: "background.default" }}>
            <Paper elevation={0} sx={{ width: "100%", maxWidth: 440, p: { xs: 3, sm: 5 }, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Stack spacing={3} component="form" noValidate onSubmit={handleSubmit}>
                    <Box>
                        <Box sx={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: "brand.light", color: "brand.main", mb: 2 }}>
                            <LockOutlinedIcon />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 750, color: "brand.main" }}>Welcome back</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Sign in to continue to Bloggy.</Typography>
                    </Box>

                    {message && <Alert severity="error">{message}</Alert>}

                    <TextField label="Email address" name="email" type="email" autoComplete="username" autoFocus fullWidth
                        value={form.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}
                        inputProps={{ maxLength: 254 }} />
                    <TextField label="Password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" fullWidth
                        value={form.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password}
                        InputProps={{ endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ) }} />
                    <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ py: 1.4, bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}>
                        {isSubmitting ? "Signing in…" : "Sign in"}
                    </Button>
                    <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2, bgcolor: "action.hover" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "brand.main", mb: 1 }}>
                            Recruiter demo credentials
                        </Typography>
                        <Stack spacing={0.5}>
                            <Typography variant="body2" color="text.secondary">
                                <Box component="span" sx={{ fontWeight: 700, color: "text.primary", mr: 0.75 }}>Email</Box>
                                abc1@gmail.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Box component="span" sx={{ fontWeight: 700, color: "text.primary", mr: 0.75 }}>Password</Box>
                                1123456789
                            </Typography>
                        </Stack>
                    </Box>
                    <Typography variant="caption" color="text.secondary" textAlign="center">Your account credentials are handled securely.</Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Login;
