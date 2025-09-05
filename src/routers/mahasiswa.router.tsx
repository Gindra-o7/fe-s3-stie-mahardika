import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected.router";
import DetailRiwayatPage from "@/pages/mahasiswa/murojaah/detail-riwayat/page";

export const mahasiswaRouter = [
  {
    path: "/mahasiswa/murojaah",
    element: <Navigate to="/mahasiswa/murojaah/detail-riwayat" />,
  },
  {
    path: "/mahasiswa/murojaah/detail-riwayat",
    element: (
      <ProtectedRoute roles={["mahasiswa"]}>
        <DetailRiwayatPage />
      </ProtectedRoute>
    ),
  },
];
