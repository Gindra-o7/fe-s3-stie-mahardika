import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected.router";
import MahasiswaSetoranHafalanDetailRiwayatPage from "@/pages/mahasiswa/setoran-hafalan/detail-riwayat/page";

export const mahasiswaRouter = [
  {
    path: "/mahasiswa/murojaah",
    element: <Navigate to="/mahasiswa/murojaah/detail-riwayat" />,
  },
  {
    path: "/mahasiswa/murojaah/detail-riwayat",
    element: (
      <ProtectedRoute roles={["mahasiswa"]}>
        <MahasiswaSetoranHafalanDetailRiwayatPage />
      </ProtectedRoute>
    ),
  },
];
