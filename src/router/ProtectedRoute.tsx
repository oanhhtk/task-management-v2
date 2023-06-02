import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // console.log("ProtectedRoute", localStorage.getItem("accessToken"));
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
