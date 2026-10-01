import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid";
import { geUserRoleCount } from "../api/settingsApi";

const RolesTable = () => {
    const [rows, setRows] = useState([]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'NAME', width: 100 },
        { field: 'description', headerName: 'DESCRIPTION', width: 300 },
        { field: 'users', headerName: 'USERS', width: 70 }
    ]



    const fetchRoleCount = async () => {
        const results = await geUserRoleCount();
        const { admin_count, editor_count, author_count } = results?.role_count;
        const rowData = [
            { id: 1, name: 'Admin', description: 'Admin can access and manage all features', users: admin_count },
            { id: 2, name: 'Editor', description: 'Editor can manage nd publish content including articles', users: editor_count },
            { id: 3, name: 'Author', description: 'Authors can manage the content they have created', users: author_count },
        ]
        setRows(rowData);
    }

    useEffect(() => {
        fetchRoleCount();
    }, [])
    return (
        <>
            <DataGrid
                columns={columns}
                rows={rows}
                pagination={false}
            />
        </>
    );

};

export default RolesTable;