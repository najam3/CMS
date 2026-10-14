import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from "react-dom/client";
const router = createBrowserRouter([{path: "*", element: <App />}])



createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);


