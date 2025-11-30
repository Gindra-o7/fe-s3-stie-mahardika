import { createBrowserRouter } from "react-router-dom";
import { generalRouter } from "./general.router";
import { pendaftarRouter } from "./pendaftar.router";
import { mahasiswaRouter } from "./mahasiswa.router";

const router = createBrowserRouter([
	...generalRouter,
	...pendaftarRouter,
	...mahasiswaRouter
]);

export default router;