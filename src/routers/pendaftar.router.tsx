import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./protected.router";
import DashboardPendaftar from "@/pages/pendaftar/page";

export const pendaftarRouter = [
  {
    path: "/mahasiswa/murojaah",
    element: <Navigate to="/mahasiswa/murojaah/detail-riwayat" />,
  },
  {
    path: "/pendaftar/dashboard",
    element: (
      <DashboardPendaftar/>
    ),
  },
];
