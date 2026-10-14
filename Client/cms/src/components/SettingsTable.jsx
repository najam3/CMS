import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllUsers } from "../api/settingsApi";
import searchUsers from "../api/searchUsers";
import deactivateUser from "../api/deactivateUser";
import { Box, Stack } from "@mui/system";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateUserModal from "./CreateUserModal";
import { toast } from "react-toastify";

const toLabel = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";

export default function SettingsTable() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [userToDeactivate, setUserToDeactivate] = useState(null);
    const [deactivating, setDeactivating] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const confirmDeactivate = async () => {
        const selectedUser = userToDeactivate;
        if (!selectedUser || deactivating) return;

        setDeactivating(true);
        try {
            const result = await deactivateUser(selectedUser.id);
            // setRows((currentRows) => currentRows.map((row) => row.id === selectedUser.id
            //     ? { ...row, status: "Inactive", deactivate: true }
            //     : row
            // ));
            toast.success(result?.message || `${selectedUser.name} was deactivated.`);
            setUserToDeactivate(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not deactivate this user. Please try again.");
        } finally {
            setDeactivating(false);
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 180 },
        { field: "email", headerName: "Email", width: 220 },
        {
            field: "role",
            headerName: "Role",
            width: 130,
            renderCell: (params) => {
                const roleColor = { Admin: "error", Editor: "warning", Author: "info" };
                return <Chip label={params.value} size="small" color={roleColor[params.value] || "default"} />;
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                const statusColor = { Active: "success", Inactive: "warning" };
                return <Chip label={params.value} size="small" color={statusColor[params.value] || "default"} />;
            },
        },
        {
            field: "deactivate",
            headerName: "Deactivate user",
            width: 150,
            renderCell: (params) => (
                <Switch
                    checked={params.value}
                    onChange={(_, checked) => {
                        if (checked) setUserToDeactivate(params.row);
                    }}
                    inputProps={{ "aria-label": `Deactivate ${params.row.name}` }}
                />
            ),
        },
    ];

    useEffect(() => {
        let active = true;
        const timer = window.setTimeout(async () => {
            setLoading(true);
            setLoadError("");
            try {
                const response = searchTerm.trim()
                    ? await searchUsers(searchTerm.trim())
                    : await getAllUsers();
                if (!active) return;
                const users = Array.isArray(response) ? response : response?.users || [];
                setRows(users.map((user) => ({
                    id: user?.id,
                    name: user?.name || "",
                    email: user?.email || "",
                    role: toLabel(user?.role),
                    status: toLabel(user?.status),
                    deactivate: toLabel(user?.status) === "Inactive",
                })));
            } catch (error) {
                if (active) setLoadError(error.response?.data?.message || "Unable to load users.");
            } finally {
                if (active) setLoading(false);
            }
        }, searchTerm.trim() ? 250 : 0);

        return () => {
            active = false;
            window.clearTimeout(timer);
        };
    }, [searchTerm]);

    return (
        <Box>
            <Stack sx={{ mb: 2, justifyContent: "space-between" }} direction="row" spacing={2}>
                <TextField
                    id="user-search"
                    size="small"
                    label="Search users"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    inputProps={{ "aria-label": "Search users by name, email, role, or status" }}
                />
                <Button onClick={handleOpen} variant="contained" color="info" startIcon={<AddIcon />}>Create user</Button>
            </Stack>
            {loadError && <Typography color="error" variant="body2" sx={{ mb: 1 }}>{loadError}</Typography>}
            <DataGrid
                columns={columns}
                rows={rows}
                loading={loading}
                autoHeight
                pageSizeOptions={[10, 25, 50]}
                getRowClassName={(params) => params.row.deactivate ? "user-row-disabled" : ""}
                sx={{
                    "& .MuiDataGrid-row.user-row-disabled": {
                        opacity: 0.55,
                        backgroundColor: "action.disabledBackground",
                        pointerEvents: "none",
                    },
                    "& .MuiDataGrid-row.user-row-disabled .MuiDataGrid-cell": {
                        color: "text.disabled",
                    },
                }}
            />
            <CreateUserModal open={openModal} handleClose={handleClose} />
            <Dialog
                open={Boolean(userToDeactivate)}
                onClose={() => { if (!deactivating) setUserToDeactivate(null); }}
                aria-labelledby="deactivate-user-title"
                aria-describedby="deactivate-user-description"
            >
                <DialogTitle id="deactivate-user-title">Deactivate user?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="deactivate-user-description">
                        Are you sure you want to deactivate {userToDeactivate?.name || "this user"}? Their row will be disabled and all of their articles, including drafts, will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setUserToDeactivate(null)} disabled={deactivating}>Cancel</Button>
                    <Button onClick={confirmDeactivate} color="error" variant="contained" disabled={deactivating}>{deactivating ? "Deactivating…" : "Deactivate"}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}





