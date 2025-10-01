import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import ProcessTimeline from '@/components/landing/ProcessTimeline';
import Requirements from '@/components/landing/Requirements';
import Footer from '@/components/landing/Footer';
import RegistrationSteps from '@/components/landing/RegistrationSteps';
import {LoadingScreen} from "@/components/landing/Loading"
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="bg-light-grey font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <ProcessTimeline />
        <Requirements />
        <RegistrationSteps />
      </main>
      <Footer />
    </div>
  );
}

export default App;