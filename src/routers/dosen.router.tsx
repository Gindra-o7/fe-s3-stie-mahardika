import ProtectedRoute from "./protected.router";
import DosenSetoranHafalanMahasiswaPAPage from "@/pages/dosen/setoran-hafalan/mahasiswa-pa/page";
import DetailMahasiswaSetoran from "@/pages/dosen/setoran-hafalan/mahasiswa-pa/DetailMahasiswaSetoran";

export const dosenRouter = [
  {
    path: "/dosen/murojaah/mahasiswa-pa",
    element: (
      <ProtectedRoute roles={["dosen"]}>
        <DosenSetoranHafalanMahasiswaPAPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dosen/murojaah/mahasiswa-pa/:nim",
    element: (
      <ProtectedRoute roles={["dosen"]}>
        <DetailMahasiswaSetoran />
      </ProtectedRoute>
    ),
  }
];
