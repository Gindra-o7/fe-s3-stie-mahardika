import KartuMurojaahPage from "@/pages/publics/kartu-murojaah";
import ForbiddenPage from "@/pages/publics/forbidden.page";
import LandingPage from "@/pages/publics/landing.page";
import NotFoundPage from "@/pages/publics/not-found.page";
import KartuRekapanMurojaahPAPage from "@/pages/publics/kartu-rekapan-muroja'ah-pa";
import LoginPage from "@/pages/publics/login.page";
import BiayaPage from "@/pages/publics/biaya.page";
import TataCaraPendaftaranPage from "@/pages/publics/tata-cara-pendaftaran.page";
import CurriculumPage from "@/pages/publics/curriculum.page";

export const generalRouter = [
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/beranda",
		element: <LandingPage />,
	},
	{
		path: "/profile",
		element: <LandingPage />,
	},
	{
		path: "/curriculum",
		element: <CurriculumPage />,
	},
	{
		path: "/cost",
		element: <BiayaPage />,
	},
	{
		path: "/registration",
		element: <TataCaraPendaftaranPage />,
	},
	{
		path: "/forbidden",
		element: <ForbiddenPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
	{
		path: "/kartu-murojaah/:id",
		element: <KartuMurojaahPage />,
	},
	{
		path: "/kartu-rekapan-murojaah-pa/:id",
		element: <KartuRekapanMurojaahPAPage/>,
	},
	{
		path: "/login",
		element: <LoginPage />,
	}
]