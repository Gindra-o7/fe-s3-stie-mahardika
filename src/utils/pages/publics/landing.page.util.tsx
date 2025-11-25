const handleGoToDashboard = ({ token: _token }: { token?: string }) => {
    // Simplified: return default route
    // const userRoles = getRoles({ token });
    // if (userRoles.includes("mahasiswa")) return ("/mahasiswa/murojaah/detail-riwayat");
    // else if (userRoles.includes("dosen")) return ("/dosen/murojaah/mahasiswa-pa");
    return ("/");
};

export { handleGoToDashboard };