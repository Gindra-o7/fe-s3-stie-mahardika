import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./protected.router";
import DashboardPendaftar from "@/pages/pendaftar/page";

export const pendaftarRouter = [
  {
    path: "/pendaftar",
    element: <Navigate to="/pendaftar/dashboard" />,
  },
  {
    path: "/pendaftar/dashboard",
    element: (
      <DashboardPendaftar/>
    ),
  },
];
