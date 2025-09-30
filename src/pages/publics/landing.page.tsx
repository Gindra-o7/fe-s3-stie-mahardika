import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import ProcessTimeline from '@/components/landing/ProcessTimeline';
import Requirements from '@/components/landing/Requirements';
import Footer from '@/components/landing/Footer';
import RegistrationSteps from '@/components/landing/RegistrationSteps';

function App() {
  return (
    <div className="bg-white font-sans">
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