import { createBrowserRouter } from "react-router-dom";
import { generalRouter } from "./general.router";
import { mahasiswaRouter } from "./mahasiswa.router";
import { dosenRouter } from "./dosen.router";
import { pendaftarRouter } from "./pendaftar.router";

const router = createBrowserRouter([
	...generalRouter,
	...mahasiswaRouter,
	...dosenRouter,
	...pendaftarRouter
]);

export default router;