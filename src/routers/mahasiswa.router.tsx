import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected.router";
import DashboardMahasiswa from "@/pages/mahasiswa/dashboard.page";

export const mahasiswaRouter = [
    {
        path: "/mahasiswa",
        element: <Navigate to="/mahasiswa/dashboard" />,
    },
    {
        path: "/mahasiswa/dashboard",
        element: (
            <ProtectedRoute roles={["mahasiswa"]}>
                <DashboardMahasiswa />
            </ProtectedRoute>
        ),
    },
];
