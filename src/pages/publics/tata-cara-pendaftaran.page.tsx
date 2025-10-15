import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { LoadingScreen } from "@/components/landing/Loading";
import { useEffect, useState } from "react";

import BackgroundImage1 from "@/assets/foto/VICL0820.webp";
import RegistrationProcedure from "@/components/tata-cara-pendaftaran/RegistrationProcedure";

const TataCaraPendaftaranPage = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const img = new Image();
		img.src = BackgroundImage1;
		img.onload = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		};
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}
	return (
		<div className="bg-light-grey font-sans">
			<Header />
			<main>
				<RegistrationProcedure />
			</main>
			<Footer />
		</div>
	);
};

export default TataCaraPendaftaranPage;
