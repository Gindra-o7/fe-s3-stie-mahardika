import { createBrowserRouter } from "react-router-dom";
import { generalRouter } from "./general.router";
import { pendaftarRouter } from "./pendaftar.router";

const router = createBrowserRouter([
	...generalRouter,
	...pendaftarRouter
]);

export default router;