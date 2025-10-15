import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { LoadingScreen } from "@/components/landing/Loading";
import { useEffect, useState } from "react";

import BackgroundImage1 from "@/assets/foto/VICL0820.webp";
import StudyProfile from "@/components/profil-prodi/StudyProfile";

const ProfilProdiPage = () => {
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
                <StudyProfile />
            </main>
            <Footer />
        </div>
    );
};

export default ProfilProdiPage;
