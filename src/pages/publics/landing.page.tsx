import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import ProcessTimeline from '@/components/landing/ProcessTimeline';
import Requirements from '@/components/landing/Requirements';
import Footer from '@/components/landing/Footer';
import RegistrationSteps from '@/components/landing/RegistrationSteps';
import {LoadingScreen} from "@/components/landing/Loading"
import { useEffect, useState } from 'react';

import BackgroundImage1 from "@/assets/foto/mh-12.webp";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = BackgroundImage1;
    img.onload = () => {
      setIsLoading(false);
    };
  }, []);


  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="bg-light-grey font-sans">
      <Header />
      <main>
        <Hero/>
        <Features />
        <ProcessTimeline />
        <Requirements />
        <RegistrationSteps />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;