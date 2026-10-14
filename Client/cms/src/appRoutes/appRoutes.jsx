import AllArticles from "../pages/AllArticles";
import CreateNewArticles from "../pages/CreateNewArticles";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RolesAndPermissionManager from "../pages/RolesAndPermissionManager";




export  const routes = [
{
    name: "Dashboard", url: '/', element: <Dashboard />, permissions: 'admin:dashboard', icon: <DashboardIcon sx={{ color: 'common.white' }}/>
},

{
   name: "Manage Content", icon:<ContentCopyIcon sx={{ color: 'common.white' }}/>, permissions: 'admin/author:content',
   lists: [ { name: 'All Articles', url: "/allArticles", element: <AllArticles /> }, { name: "Create Article", url: "/createArticle", element: <CreateNewArticles />} ]
},
{
    name: "Settings", lists: [ {name: 'User Management', url: '/settings', element: <Settings /> }, { name: 'Roles and Permissions', url: '/roles', element: <RolesAndPermissionManager />  } ], permissions: 'admin:settings',
},
];


