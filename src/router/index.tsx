import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import RapidBoard from "../pages/RapidBoard";
import ProtectedRoute from "./ProtectedRoute";

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <App />,
            path: "/",
          },
          { element: <RapidBoard />, path: `/rapid-board/:folderId` },
          {
            element: <RapidBoard />,
            path: `/note/:noteId`,
          },
        ],
      },
    ],
  },
]);
