import ForbiddenPage from "@/pages/publics/forbidden.page";
import LandingPage from "@/pages/publics/landing.page";
import NotFoundPage from "@/pages/publics/not-found.page";
import LoginPage from "@/pages/publics/login.page";
import ForgotPasswordPage from "@/pages/publics/forgot-password.page";
import ResetPasswordPage from "@/pages/publics/reset-password.page";
import BiayaPage from "@/pages/publics/biaya.page";
import TataCaraPendaftaranPage from "@/pages/publics/tata-cara-pendaftaran.page";
import CurriculumPage from "@/pages/publics/curriculum.page";
import ProfilProdiPage from "@/pages/publics/profil-prodi.page";
import PaymentCallbackPage from "@/pages/publics/payment-callback.page";
import { RouteObject } from "react-router-dom";

export const generalRouter: RouteObject[] = [
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
		element: <ProfilProdiPage />,
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
		path: "/payment-callback",
		element: <PaymentCallbackPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/forgot-password",
		element: <ForgotPasswordPage />,
	},
	{
		path: "/reset-password",
		element: <ResetPasswordPage />,
	}
];