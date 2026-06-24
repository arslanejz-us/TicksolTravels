import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import DestinationsSection from '@/components/DestinationsSection';
import PackagesSection from '@/components/PackagesSection';
import LeadershipSection from '@/components/LeadershipSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DestinationsSection />
      <PackagesSection />
      <LeadershipSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
