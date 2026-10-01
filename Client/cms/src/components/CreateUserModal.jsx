import { Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Modal, Select, Stack } from "@mui/material"
import { useEffect, useState } from "react";
import { createUsers } from "../api/settingsApi";
import { toast } from "react-toastify";


const CreateUserModal = ({ open, handleClose }) => {
    const [data, setData] = useState({ name: "", email: "", password: "", role: "", status: "active" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsloading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((currentData) => ({ ...currentData, [name]: value }));
    };

    const resetErrState = () => setErrors({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = {
            name: !data.name.trim(),
            email: !data.email.trim(),
            password: !data.password.trim(),
            role: !data.role,
        };

        setErrors(nextErrors);

        if (Object.values(nextErrors).some(Boolean)) {
            return;
        }

        setIsloading(true);

        try {
            const response = await createUsers(data);
            toast.success(response.data.message);
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setData({ name: "", email: "", password: "", role: "", status: "active" })
            setIsloading(false);
        }
    };



    useEffect(() => {
        !open && resetErrState();
    }, [open])


    return (
        <Modal open={open} onClose={handleClose}>
            {/* <Typography variant="body1">Create new user</Typography> */}
            <Box sx={style} component="form" noValidate>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <FormControl fullWidth error={errors.name}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input id="name" name="name" value={data.name} onChange={handleChange} aria-describedby="name-helper-text" />

                                <FormHelperText id="name-helper-text">{errors.name ? "Name is required." : "Please enter the full name."}</FormHelperText>
                            </FormControl>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <FormControl fullWidth error={errors.email}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} aria-describedby="email-helper-text" />

                                <FormHelperText id="email-helper-text">{errors.email ? "Email is required." : "Please enter the email address."}</FormHelperText>
                            </FormControl>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <FormControl fullWidth error={errors.password}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name="password" type="password" value={data.password} onChange={handleChange} aria-describedby="password-helper-text" />

                                <FormHelperText id="password-helper-text">{errors.password ? "Password is required." : "Please enter a password."}</FormHelperText>
                            </FormControl>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <FormControl fullWidth error={errors.role}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select size="medium" onChange={(e) => {
                                    setData((currentData) => ({ ...currentData, role: e.target.value }));
                                }}>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"author"}>Author</MenuItem>
                                    <MenuItem value={"editor"}>Editor</MenuItem>
                                </Select>
                            </FormControl>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <Button size="small" sx={{ width: '100%', mt: 3 }} loading={isLoading} onClick={handleSubmit} variant="contained">Create user</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )

};


export default CreateUserModal;


// Styles

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 1, borderColor: 'divider', borderRadius: 3,
    boxShadow: 24,
    p: 4,
};



